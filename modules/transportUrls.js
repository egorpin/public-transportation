class TransportUrls {
    constructor() {
        // empty string = same origin (Vite dev / production static)
        // set explicit IP for direct node server usage without bundler
        this.baseUrl = '';
    }

    getTransport() {
        return `${this.baseUrl}/transport`;
    }

    getTransportById(id) {
        return `${this.baseUrl}/transport/${id}`;
    }

    createTransport() {
        return `${this.baseUrl}/transport`;
    }

    removeTransportById(id) {
        return `${this.baseUrl}/transport/${id}`;
    }

    updateTransportById(id) {
        return `${this.baseUrl}/transport/${id}`;
    }
}

export const transportUrls = new TransportUrls();
