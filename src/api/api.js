// import { notify } from '../notify.js';
import { getUserData, clearUserData, setUserData } from '../util.js';

const hostname = 'http://localhost:3030';

async function request(url, options) {
    try { //network greshki ot fetch-a
        const response = await fetch(hostname + url, options);

        if (response.ok == false) {
            const error = await response.json(); // serverna greshka
            throw new Error(error.message)
        }
        if (response.status == 204) {
            return response;
        } else {
            return response.json()
        }

    } catch (err) {
        // alert(err.message);
        alert(err.message)
        throw err;
    }
}

function createOptions(method = 'get', data) {
    const options = {
        method,
        headers: {}
    };
    if (data != undefined) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data)
    }
    const userData = getUserData();
    if (userData) {
        options.headers['X-Authorization'] = userData.token;
    }
    return options;
}


export async function get(url) {
    return request(url, createOptions())
}
export async function post(url, data) {
    return request(url, createOptions('post', data))
}
export async function put(url, data) {
    return request(url, createOptions('put', data))
}
export async function del(url) {
    return request(url, createOptions('delete'))
}

// svurzani se so servisot
export async function login(email, password) {
    const result = await post('/users/login', { email, password });
    const userData = {
        // username: result.username,
        email: result.email,
        id: result._id,
        // gender: result.gender,
        token: result.accessToken
    };
    setUserData(userData);
    return result;

}
export async function register(email, password) {
    const result = await post('/users/register', { email, password });
    const userData = {
        // username: result.username,
        email: result.email,
        id: result._id,
        // gender: result.gender,
        token: result.accessToken
    };
    setUserData(userData);
    return result;
}
export async function logout() {
    get('/users/logout');
    clearUserData();
}