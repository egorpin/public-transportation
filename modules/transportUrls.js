class TransportUrls {
    constructor() {
        this.baseUrl = 'http://172.31.123.64:3000';
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
