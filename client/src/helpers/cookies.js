import Cookies from 'universal-cookie';

const cookies = new Cookies();

export function getTokenFromCookies() {
    return cookies.get('token');
}

export function setTokenInCookies(token) {
    cookies.set('token', token);
}

export function removeTokenFromCookies() {
    cookies.remove('token');
}