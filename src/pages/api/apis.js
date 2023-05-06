// api.js

import fetch from 'isomorphic-unfetch';

const API_BASE_URL = 'https://seba-backend.xyz/';

const headers = {
    'Content-Type': 'application/json',
};

function getAuthorizationHeader() {
    let accessToken = localStorage.getItem("access_token")
    if (accessToken) {
        return { 'Authorization': `Bearer ${accessToken}` };
    }
    return {};
}

export async function callApi(endpoint, options = {}) {
    const url = API_BASE_URL + endpoint;
    const requestOptions = {
        ...options,
        headers: {
            ...headers,
            ...getAuthorizationHeader(),
            ...options.headers,
        },
    };
    const response = await fetch(url, requestOptions);
    return await response.json();
}

export const onHandleCartLength = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${localStorage.getItem("access_token")}`);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    const response = await fetch("https://seba-backend.xyz/api-seller/cart-list/", requestOptions);
    return await response.json();
}
