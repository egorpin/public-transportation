const fileService = require('./fileService');

let dataFilePath;

const init = (filePath) => {
    dataFilePath = filePath;
};

const findAll = (type) => {
    const transports = fileService.readData(dataFilePath);
    if (type) {
        return transports.filter(transport =>
            transport.type.toLowerCase().includes(type.toLowerCase())
        );
    }
    return transports;
};

const findOne = (id) => {
    const transports = fileService.readData(dataFilePath);
    return transports.find(transport => transport.id === id);
};

const create = (transportData) => {
    const transports = fileService.readData(dataFilePath);
    const newId = transports.length > 0
        ? Math.max(...transports.map(s => s.id)) + 1
        : 1;
    const newTransport = { id: newId, ...transportData };
    transports.push(newTransport);
    fileService.writeData(dataFilePath, transports);
    return newTransport;
};

const update = (id, transportData) => {
    const transports = fileService.readData(dataFilePath);
    const index = transports.findIndex(s => s.id === id);
    if (index === -1) return null;
    transports[index] = { ...transports[index], ...transportData };
    fileService.writeData(dataFilePath, transports);
    return transports[index];
};

const remove = (id) => {
    const transports = fileService.readData(dataFilePath);
    const filteredtransports = transports.filter(s => s.id !== id);
    if (filteredtransports.length === transports.length) {
        return false;
    }
    fileService.writeData(dataFilePath, filteredtransports);
    return true;
};

module.exports = { init, findAll, findOne, create, update, remove };
