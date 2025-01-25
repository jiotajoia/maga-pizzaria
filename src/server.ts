import express from 'express';
import "reflect-metadata";
import { router } from './routes/web';

const app = express();

app.use(express.json());
app.use('/maga',router);

app.listen(3000, () => {
    console.log(`Servidor rodando na porta 3000`);
});