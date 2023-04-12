import React from "react";
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

    postOrder = (ingredients) => this._request(`${this._options.baseUrl}/orders`, 
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ingredients }),
        })
}

const apiOptions = {
    baseUrl: url,
};

const api = new Api(apiOptions);

export default api;