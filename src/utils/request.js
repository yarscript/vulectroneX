import axios from "axios";


const token = localStorage.getItem('token')

if (token) {
    axios.defaults.headers.common['Authorization'] = token
}
if (process.env.NODE_ENV !== 'production') {
    axios.defaults.headers.common['XDEBUG_SESSION_START'] = 'PHPSTORM'
}

let baseURL = "";

if (process.env.IS_ELECTRON) {
    if (process.env.NODE_ENV === "production") {
        baseURL = process.env.VUE_APP_ELECTRON_API_URL;
    } else {
        baseURL = process.env.VUE_APP_ELECTRON_API_URL_DEV;
    }
} else {
    baseURL = process.env.VUE_APP_NETEASE_API_URL;
}

const service = axios.create({
    baseURL,
    withCredentials: true,
    timeout        : 15000,
});

service.interceptors.response.use(
    response => response.data,
    (error) => {
        const errMsg = `error: ${ error }`;
        console.log(errMsg);

        return Promise.reject(error);
    }
);

export default service;
