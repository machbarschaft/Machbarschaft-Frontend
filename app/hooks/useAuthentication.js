import React from 'react'

// ToDo: Welche Daten wollen wir für den lokalen Nutzer speichern?
const initialAuthenticationState = {
    user_id: null
}

function authenticationReducer(state, action) {
    if (action.type === "authenticateSuccess") {
        return {
            ...state,
            user_id: Math.random() * (1000)
        }
    } else if (action.type === "authenticationFailure") {
        return {
            ...state,
            user_id: null
        }
    } else if (action.type === "invalidateSuccess") {
        return {
            ...state,
            user_id: null
        }
    } else {
        throw new Error("Unsupported Type")
    }
}

/**
 * The custom hook useAuthentication holds the current authentication data. It provides information about the authenticated user (if any)
 * as well as methods to login (verify), check and invalidate the authentication.
 * Components that need to access any of these data, can just use (e.g.) 'const [authenticatedUser, {checkAuthentication}] = useAuthentication()'.
 *
 * @returns {[{user_id: null}, {invalidateAuthentication: (function(): boolean), checkAuthentication: checkAuthentication}]}
 */
export default function useAuthentication() {
    const [authenticationState, dispatch] = React.useReducer(
        authenticationReducer,
        initialAuthenticationState
    )

    /* Check for authentication on first build */
    React.useEffect(() => {
        checkAuthentication()
    }, [])

    const verifyAuthentication = (email, password) => {
        // ToDo: Send credentials to server and wait for response. CheckAuthentication afterwards.

        checkAuthentication()

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if(email == "0123456789" && password == "password") {
                    dispatch({
                        type: "authenticateSuccess"
                    })
                    resolve();
                }
                    else {
                        dispatch({
                            type: "authenticationFailure"
                        })
                        reject();
                    }
            }, 2000);
        });
    }

    const checkAuthentication = () => {
        // ToDo: Make API call to check, if there's a user for a JWT cookie

        dispatch({
            type: "authenticationFailure" // To test authenticated state: pass "authenticateSuccess"
        })
    }

    const invalidateAuthentication = () => {
        // ToDo: Invalidate Cookie

        dispatch({
            type: "invalidateSuccess"
        })
    }

    return [authenticationState, {
        verifyAuthentication,
        checkAuthentication,
        invalidateAuthentication
    }]
}