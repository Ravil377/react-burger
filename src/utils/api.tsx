import { url } from './constants'

interface IApiOptions {
    baseUrl: string;
}

class Api {
    private _options: IApiOptions;

    constructor(options: IApiOptions) {
        this._options = options;
    }

    _answerForServer = (res: Response) => {
        return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
    };

    _request(url: string, options: any) {
        return fetch(url, options).then(this._answerForServer)
    }   

    _fetchWithRefresh = async (url: string, options: any) => {
        try {
            const res = await fetch(url, options); 
            return await this._answerForServer(res)
        } catch (err: any) {
            if (err.message === "jwt expired") {
                const refreshData = await this.refreshToken(); 
                localStorage.setItem("refreshToken", refreshData.refreshToken);
                localStorage.setItem("accessToken", refreshData.accessToken);
                options.headers.authorization = refreshData.accessToken;
                const res = await fetch(url, options);
                return await this._answerForServer(res);
            } else {
                return Promise.reject(err);
            }
        }
    }

    getInitialIngredients = () => this._request(`${this._options.baseUrl}/ingredients`, {})

    refreshToken = () => this._request(`${this._options.baseUrl}/auth/token`, 
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({token: localStorage.getItem("refreshToken")})
        })
    
    getUser = (accessToken: string | null) =>  this._fetchWithRefresh(`${this._options.baseUrl}/auth/user`,
        {
            method: "GET",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": accessToken 
            },
        }) 

    patchUser = (accessToken: string | null, email: string, name: string, password: string) =>  this._fetchWithRefresh(`${this._options.baseUrl}/auth/user`,
        {
            method: "PATCH",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": accessToken 
            },
            body: JSON.stringify({ email: email, name: name, password: password })
        }) 

    postOrder = (accessToken: string | null, ingredients: string[]) => this._request(`${this._options.baseUrl}/orders `, 
        {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": accessToken 
            },
            body: JSON.stringify({ ingredients })
        })

    forgotPassword = (email: string) => this._request(`${this._options.baseUrl}/password-reset`, 
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: email })
        })

    resetPassword = (password: string, token: string) => this._request(`${this._options.baseUrl}/password-reset/reset`, 
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ password: password, token: token })
        })

    register = (email: string, password: string, name: string) => this._request(`${this._options.baseUrl}/auth/register`, 
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ password: password, email: email, name: name })
        })

    login = (email: string, password: string) => this._request(`${this._options.baseUrl}/auth/login`, 
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ password: password, email: email })
        })
    
    logOut = (refreshToken: string | null) => this._request(`${this._options.baseUrl}/auth/logout`, 
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