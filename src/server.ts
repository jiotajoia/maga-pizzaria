import express from 'express';
import bodyParser from 'body-parser'; 
import "reflect-metadata";
import flash from 'connect-flash';
import { engine } from 'express-handlebars';
import path from 'path';
import { router } from './routes/index.router';
import { AppDataSource } from './data-source';

const app = express();

app.engine('handlebars', engine({
    defaultLayout: 'main',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true  
    }
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, "media")));
app.use('/maga', express.static(path.join(__dirname, "media")));


app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());


AppDataSource.initialize()
    .then(()=> {
        console.log('banco de dados Subiu!')
    })
    .catch((err: any)=> {
        console.error(`erro ao subir o banco ${err}`);
 }); 
 
app.use(express.json());

app.use(flash());

app.use('/maga', router);

app.listen(3000, () => {
    console.log(`Servidor rodando na porta 3000`);
});