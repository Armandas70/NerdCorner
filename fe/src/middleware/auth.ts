export function isUser() {
    const token = window.localStorage.getItem("access_token");
    if (token !== null && token !== undefined) {
        return true;
    }
    return false;
    // console.log("access_token: ", token);
}