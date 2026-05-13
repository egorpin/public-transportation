const fileService = require('./fileService');

let dataFilePath;

const init = (filePath) => {
    dataFilePath = filePath;
};

const findAll = (type) => {
    const transports = fileService.readData(dataFilePath);
    if (type) {
        return transports.filter(stock =>
            stock.type.toLowerCase().includes(type.toLowerCase())
        );
    }
    return transports;
};

const findOne = (id) => {
    const transports = fileService.readData(dataFilePath);
    return transports.find(stock => stock.id === id);
};

const create = (stockData) => {
    const transports = fileService.readData(dataFilePath);
    const newId = transports.length > 0
        ? Math.max(...transports.map(s => s.id)) + 1
        : 1;
    const newStock = { id: newId, ...stockData };
    transports.push(newStock);
    fileService.writeData(dataFilePath, transports);
    return newStock;
};

const update = (id, stockData) => {
    const transports = fileService.readData(dataFilePath);
    const index = transports.findIndex(s => s.id === id);
    if (index === -1) return null;
    transports[index] = { ...transports[index], ...stockData };
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
