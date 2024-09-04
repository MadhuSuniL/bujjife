

export const getUserData = () => {
    return JSON.parse(localStorage.getItem('userData'));
}

export const getUserToken = () => {
    return getUserData()?.token || null;
}
export const getUserName = () => {
    return getUserData()?.username || null;
}