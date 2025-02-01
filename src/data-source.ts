require("reflect-metadata");
const { DataSource } = require("typeorm");

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "12345678",
    database: "maga-pizzaria",
    synchronize: false,
    logging: true,
    entities: ['./models/*.js'],
    subscribers: [],
    migrations: ['./migrations/*.js'],
}); 

AppDataSource.initialize()
    .then(()=> {
        console.log('banco de dados Subiu!')
    })
    .catch((err: any)=> {
        console.error(`erro ao subir o banco ${err}`);
 }); 