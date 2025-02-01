import { AppDataSource } from "../data-source";
import { Order } from "../models/order.entity";

export const OrderRepository = AppDataSource.getRepository(Order);