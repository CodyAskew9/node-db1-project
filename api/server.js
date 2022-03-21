const express = require("express");
const accountsRouter = require('./accounts/accounts-router')
const server = express();

server.use(express.json());
server.use('/api/accounts', accountsRouter);

server.get('*' , (req,res) => {
    res.status(404).json({ message: 'Please enter a valid web address' })
})

module.exports = server;