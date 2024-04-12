import { ApiEndpoint } from './api';

export async function source<T extends ApiEndpoint<any, any, any>>(url: T[0], data: T[1]): Promise<T[2]> {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    return await res.json();
}