import axios from 'axios';
import { history } from '.';

const Config = {
    PROD_API_URL: 'http://192.168.1.8:8000/',
    DEV_API_URL: 'http://192.168.1.8:8000/',
}

const apiUrl = () => {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        return Config.DEV_API_URL
    }
    return Config.PROD_API_URL
}

export const instance = axios.create({
    baseURL: apiUrl(),
    headers: {
        "Content-Type": "application/json",
    },
});

instance.interceptors.request.use(
    (config: any) => {
        const user = localStorage.getItem("user");
        if (user) {
            const token = JSON.parse(user!)["access"];
            config.headers["Authorization"] = 'Bearer ' + token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (res) => {
        return res;
    },
    async (err) => {
        const originalConfig = err.config;
        if (originalConfig.url !== "/v1/login" && err.response) {
            if (err.response.status === 401 && !originalConfig._retry) {
                originalConfig._retry = true;
                try {
                    let user: any = JSON.parse(localStorage.getItem("user")!);
                    const rs = await instance.post("/v1/refresh-token", {
                        "refresh": user["refresh"],
                    });
                    let data: any = rs.data;
                    if (data) {
                        user["access"] = data!["access"];
                    }
                    localStorage.setItem("user", JSON.stringify(user));

                    return instance(originalConfig);
                } catch (_error) {
                    return Promise.reject(_error);
                }
            }
        }

        return Promise.reject(err);
    }
);

export const unauthorizedHeaders = () => ({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
})

export const defaultHeaders = () => ({
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'JWT ' + userToken()
})

const userToken = () => {
    try {
        let user = localStorage.getItem('user');
        return JSON.parse(user!)['token'];
    } catch (error) {
        history.push('/login');
        return '';
    }
}
