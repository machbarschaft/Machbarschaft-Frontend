import apiUrl from "./apiUrl";

export const postRegisterRequest = async (formValues) => {
    const endpoint = apiUrl() + "auth/register"

    let formBody = Object.keys(formValues).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(formValues[key])).join('&')

    console.log(formBody)

    return fetch(endpoint, {
        method: 'POST',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formBody
    }).then(async (res) => {
        if (res.status === 201) {
            return res
        } else {
            res = await res.json()
            console.log(res)
            // ToDo: Return multiple errors
            throw new Error("Fehler bei der Regstrierung")
        }
    })
}