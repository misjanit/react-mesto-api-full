export const baseUrl = `${window.location.protocol}//imdone.back.nomoredomains.xyz`;
//export const baseUrl = `http://localhost:3001`;


const checkStatus = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

export const registration = (email, password) => {
    return fetch(`${baseUrl}/signup`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            "Accept": 'application/json',
            "Content-Type": "application/json",
        },
        body: JSON.stringify({email, password})
    })
        .then(checkStatus)
};

export const authorization = (email, password) => {
    return fetch(`${baseUrl}/signin`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            "Accept": 'application/json',
            "Content-Type": "application/json",             
        },
        body: JSON.stringify({email, password}),
    })
        .then(checkStatus)
}

export const checkTokenValidity = (jwt) => {
    return fetch(`${baseUrl}/users/me`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            "Accept": 'application/json',
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`
        },          
    })
        .then(checkStatus)
}

export const getContent = (token) => {
    return fetch(`${baseUrl}/users/me`, {
        method: 'GET',
        headers: {
        authorization: 'Bearer ' + localStorage.getItem('jwt'),
        "Accept": 'application/json',
        "Content-Type": "application/json",
    },
    credentials: 'include',
    })
    .then(checkStatus)
}
