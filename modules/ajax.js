class Ajax {
    async get(url) {
        const response = await fetch(url);
        const data = await response.json();
        return { data, status: response.status };
    }

    async post(url, data) {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        const json = await response.json();
        return { data: json, status: response.status };
    }
}

export const ajax = new Ajax();