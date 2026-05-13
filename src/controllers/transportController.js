const transportService = require('../services/transportService');

const getAllTransports = (req, res) => {
    const { type } = req.query;
    const transports = transportService.findAll(type);
    res.json(transports);
};

const getTransportById = (req, res) => {
    const id = parseInt(req.params.id);
    const transport = transportService.findOne(id);
    if (!transport) {
        return res.status(404).json({ error: 'Транспорт не найден' });
    }
    res.json(transport);
};

const createTransport = (req, res) => {
    const { title, type, model, desc, img, details } = req.body;
    if (!title || !type || !desc || !img) {
        return res.status(400).json({ error: 'Не все обязательные поля заполнены' });
    }
    const newTransport = transportService.create({ title, type, model, desc, img, details });
    res.status(201).json(newTransport);
};

const updateTransport = (req, res) => {
    const id = parseInt(req.params.id);
    const updatedTransport = transportService.update(id, req.body);
    if (!updatedTransport) {
        return res.status(404).json({ error: 'Транспорт не найден' });
    }
    res.json(updatedTransport);
};

const deleteTransport = (req, res) => {
    const id = parseInt(req.params.id);
    const success = transportService.remove(id);
    if (!success) {
        return res.status(404).json({ error: 'Транспорт не найден' });
    }
    res.status(204).send();
};

module.exports = {
    getAllTransports,
    getTransportById,
    createTransport,
    updateTransport,
    deleteTransport
};
