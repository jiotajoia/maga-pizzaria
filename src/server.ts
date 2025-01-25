import express from 'express';
import "reflect-metadata";
import { engine } from 'express-handlebars';
import path from 'path';
import { router } from './routes/web';

const app = express();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');

app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use('/maga',router);

app.listen(3000, () => {
    console.log(`Servidor rodando na porta 3000`);
});