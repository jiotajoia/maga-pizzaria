import express from 'express';
import "reflect-metadata";
import flash from 'connect-flash';
import { engine } from 'express-handlebars';
import path from 'path';
import { router } from './routes/index.router';

const app = express();

app.engine('handlebars', engine({
    defaultLayout: 'main',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,  // Desativa a verificação
        allowProtoMethodsByDefault: true       // Desativa a verificação
    }
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, "media")));
app.use('/maga', express.static(path.join(__dirname, "media")));


app.use(express.json());

app.use(flash());

app.use('/maga', router);

app.listen(3000, () => {
    console.log(`Servidor rodando na porta 3000`);
});