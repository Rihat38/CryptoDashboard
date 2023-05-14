const BASE_URL = 'http://127.0.0.1:8000/api/'
export const checkResponse = async (res: Response) => {
    if (res.ok) {
        return await res.json();
    }
    let response = await res.json()
    console.error(`Error ${res.status} ${response.message}`)
    return Promise.reject(`${response.message}`);
}

export const request = <T>(url: string, options: RequestInit = {}): Promise<T> => {
    return fetch(BASE_URL+url, options).then(checkResponse)
}
