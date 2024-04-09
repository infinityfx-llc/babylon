export async function source<T extends { [key: string]: any; }, K extends { [key: string]: any; }>(url: string, data: T): Promise<K> {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    return await res.json();
}