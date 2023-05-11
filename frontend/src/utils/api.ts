export const checkResponse = async (res: Response) => {
    if (res.ok) {
        return await res.json();
    }
    let response = await res.json()
    console.error(`Error ${res.status} ${response.message}`)
    return Promise.reject(`${response.message}`);
}

export const request = <T>(url: string, options: RequestInit = {}): Promise<T> => {
    return fetch(url, options).then(checkResponse)
}
