import {getCookie} from "../functions";

console.log('interceptors')

export const csrfInterceptor = (config: any) => {
    console.log(config)
    config.headers.set('X-CSRFToken', getCookie('csrftoken'))
    console.log(config.headers, 'headers');
    return config;
}