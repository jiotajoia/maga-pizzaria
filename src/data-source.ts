import { DataSource } from "typeorm";
import { Customer } from "./models/customer.entity";
import { Order } from "./models/order.entity";
import { OrderPizza } from "./models/orderpizza.entity";
import { Pizza } from "./models/pizza.entity";
import { Size } from "./models/size.entity";
import { Admin } from "./models/admin.entity";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "12345678",
    database: "maga-pizzaria",
    synchronize: true,
    logging: true,
    entities: [Customer, Order, OrderPizza, Pizza, Size, Admin],
    subscribers: [],
    migrations: [],
})