export const postRegisterRequest = async (formValues) => {
    const endpoint = "http://localhost:3000/auth/register"

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
        if(res.status === 201) {
            return
        } else {
            // ToDo: Throw Error
            res = await res.json()
            console.log(res)
        }
    })
}