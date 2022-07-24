class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    _checkStatus(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getProfile() {
        return fetch(`${this._baseUrl}/users/me`, {
            credentials: 'include',
            headers: {
                ...this._headers,
            },
        })
            .then(this._checkStatus);
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            credentials: 'include',
            headers: {
                ...this._headers,
            },
        })
            .then(this._checkStatus);
    }

    editProfile(name, about) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            credentials: 'include',
            headers: {
                ...this._headers,
            },
            body: JSON.stringify({
                name,
                about,
            }),
        })
            .then(this._checkStatus);
    }

    addCard(name, link) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                ...this._headers,
            },
            body: JSON.stringify({
                name,
                link,
            })
        })
            .then(this._checkStatus);
    }

    deleteCard(id) {
        return fetch(`${this._baseUrl}/cards/${id}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                ...this._headers,
            },
        })
            .then(this._checkStatus);
    }

    deleteLike(id) {
        return fetch(`${this._baseUrl}/cards/${id}/likes`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                ...this._headers,
            },
        })
            .then(this._checkStatus);
    }

    setLike(id) {
        return fetch(`${this._baseUrl}/cards/${id}/likes`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                ...this._headers,
            },
        })
            .then(this._checkStatus);
    }

    editAvatar(avatar) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            credentials: 'include',
            headers: {
                ...this._headers,
            },
            body: JSON.stringify({
                avatar: avatar,
            })
        })
            .then(this._checkStatus);
    }

    changeLikeCardStatus(id, isLiked) {
        if (isLiked) {
            return this.setLike(id);
        } else {
            return this.deleteLike(id);
        }
    }

    logout() {
        return fetch(`${this._baseUrl}/logout`, {
          method: "POST",
          credentials: "include",
          headers: {
            ...this._headers,
          },
        }).then(this._handleResponse);
      }

}

const api = new Api({
    baseUrl: `${window.location.protocol}//imdone.back.nomoredomains.xyz`,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    }
});

export default api;