import { AppDataSource } from "../data-source";
import { Pizza } from "../models/pizza.entity";

export const PizzaRepository = AppDataSource.getRepository(Pizza);