import { url } from './constants'

class Api {
    constructor(options) {
        this._options = options;
    }

    _answerForServer(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    _request(url, options) {
        return fetch(url, options).then(this._answerForServer)
    }

    getInitialIngredients = () => this._request(`${this._options.baseUrl}/ingredients`, {})
    

    refreshToken = () => this._request(`${this._options.baseUrl}/auth/token`, 
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({token: localStorage.getItem("refreshToken")})
        })
    
    getUser = (token) => this._request(`${this._options.baseUrl}/auth/user`,
        {
            method: "GET",
            headers: { "Content-Type": "application/json",
            "Authorization": token },
        }) 

    postOrder = (ingredients) => this._request(`${this._options.baseUrl}/token `, 
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ingredients })
        })

    forgotPassword = (email) => this._request(`${this._options.baseUrl}/password-reset`, 
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: email })
        })

    resetPassword = (password, token) => this._request(`${this._options.baseUrl}/password-reset/reset`, 
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ password: password, token: token })
        })

    register = (email, password, name) => this._request(`${this._options.baseUrl}/auth/register`, 
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ password: password, email: email, name: name })
        })

    login = (email, password) => this._request(`${this._options.baseUrl}/auth/login`, 
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ password: password, email: email })
        })
    
    logOut = (refreshToken) => this._request(`${this._options.baseUrl}/auth/logout`, 
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token: refreshToken })
        })
}

const apiOptions = {
    baseUrl: url,
};

const api = new Api(apiOptions);

export default api;