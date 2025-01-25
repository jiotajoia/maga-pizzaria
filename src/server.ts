import express from 'express';
const { Request, Response, NextFunction } = require('express');
import "reflect-metadata";

const app = express();

app.use(express.json());

app.listen(3000, () => {
    console.log(`Servidor rodando na porta 3000`);
});