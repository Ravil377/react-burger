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

    getProfileInfo() {
        return fetch(`${this._options.baseUrl}/users/me`, {
            headers: {
                authorization: `${this._options.authorization}`,
            },
        }).then((res) => this._answerForServer(res));
    }

    postProfileInfo(name, about) {
        return fetch(`${this._options.baseUrl}/users/me`, {
            method: "PATCH",
            headers: {
                authorization: `${this._options.authorization}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name,
                about: about,
            }),
        }).then((res) => this._answerForServer(res));
    }

    postProfileAvatar(avatar) {
        return fetch(`${this._options.baseUrl}/users/me/avatar`, {
            method: "PATCH",
            headers: {
                authorization: `${this._options.authorization}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                avatar: avatar,
            }),
        }).then((res) => this._answerForServer(res));
    }

    postCard(nameCard, linkCard) {
        return fetch(`${this._options.baseUrl}/cards`, {
            method: "POST",
            headers: {
                authorization: `${this._options.authorization}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: nameCard,
                link: linkCard,
            }),
        }).then((res) => this._answerForServer(res));
    }
    changeLikeCardStatus(id, isLiked) {
        const methodParametr = isLiked ? "DELETE" : "PUT";
        return fetch(`${this._options.baseUrl}/cards/likes/${id}`, {
            method: methodParametr,
            headers: {
                authorization: `${this._options.authorization}`,
                "Content-Type": "application/json",
            },
        }).then((res) => this._answerForServer(res));
    }

    getInitialIngredients () {
        return fetch(`${this._options.baseUrl}`, {
        }).then((res) => this._answerForServer(res));
    }

    deleteCard(id) {
        return fetch(`${this._options.baseUrl}/cards/${id}`, {
            method: "DELETE",
            headers: {
                authorization: `${this._options.authorization}`,
                "Content-Type": "application/json",
            },
        }).then((res) => this._answerForServer(res));
    }
}

const apiOptions = {
    baseUrl: url,
};

const api = new Api(apiOptions);

export default api;