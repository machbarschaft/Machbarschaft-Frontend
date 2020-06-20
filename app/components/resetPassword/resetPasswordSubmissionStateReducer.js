export default function resetPasswordSubmissionStateReducer(state, action) {
    if(action.type === "success") {
        return {
            ...state,
            error: null,
            loading: false
        };
    } else if(action.type === "submit") {
        return {
            ...state,
            error: null,
            loading: true
        }
    } else if(action.type === "offline") {
        return {
            ...state,
            error: "Es konnte keine Verbindung hergestellt werden. Bitte überprüfen Sie Ihre Internetverbindung und versuchen Sie es erneut.",
            loading: false
        };
    } else if(action.type === "invalid_token") {
        return {
            ...state,
            error: "Die Sitzung oder der Link ist abgelaufen. Bitte versuchen Sie erneut, Ihr Password zurückzusetzten.",
        };
    }
    else {
        throw new Error("Unsupported");
    }
}