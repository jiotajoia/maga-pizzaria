import { AppDataSource } from "../data-source";
import { OrderPizza } from "../models/orderpizza.entity";

export const OrderPizzaRepository = AppDataSource.getRepository(OrderPizza);