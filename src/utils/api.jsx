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

    getInitialIngredients () {
        return fetch(`${this._options.baseUrl}`, {
        }).then((res) => this._answerForServer(res));
    }

}

const apiOptions = {
    baseUrl: url,
};

const api = new Api(apiOptions);

export default api;