/**
 * HTTP request to perform login. Request is not cached and credentials are included to enable receiving cookie (see: https://github.com/github/fetch/issues/386)
 * @param email is the email address of the user to be authenticated
 * @param password is the password of the user to be authenticated
 * @returns {Promise<Response>} the unparsed response of the backend
 */
export const putLogin = (email, password) => {
    const endpoint = "http://localhost:3000/auth/login";

    const tmp = {email, password};
    const formBody = Object.keys(tmp).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(tmp[key])).join('&');

    return fetch(endpoint, {
        method: 'PUT',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        credentials: 'include',
        body: formBody
    }).then((res) => res);
}

/**
 * HTTP request to perform user lookup (i.e. 'who is authenticated?')
 * @returns {Promise<Response>} the unparsed response of the backend (contains user information)
 */
export const postAuthenticate = () => {
    const endpoint = "http://localhost:3000/auth/authenticate";

    return fetch(endpoint, {
        method: 'GET',
        cache: 'no-cache',
        credentials: 'include',
    }).then((res) => res);
}

/**
 * HTTP request to invalidate (logout) a user
 * @returns {Promise<Response>} the unparsed response of the backend
 */
export const postLogout = () => {
    const endpoint = "http://localhost:3000/auth/logout";

    return fetch(endpoint, {
        method: 'POST',
        cache: 'no-cache',
        credentials: 'include',
    }).then((res) => res);
}