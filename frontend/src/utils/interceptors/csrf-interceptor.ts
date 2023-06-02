import {getCookie} from "../functions";

console.log('interceptors')

export const csrfInterceptor = (config: any) => {
    config.headers.set('X-CSRFToken', getCookie('csrftoken'))
    return config;
}