export const getTokenFromLocalStorage = () => {
    const token = localStorage.getItem('token');
    if (token) {
        return JSON.parse(token)

    }
    return;
}

export const setTokenToLocalStorage = (key: string, token: string) => {
    localStorage.setItem(key, JSON.stringify(token))
}

export const removeTokenFromLocalStorage = () => {
    localStorage.removeItem('token')
}