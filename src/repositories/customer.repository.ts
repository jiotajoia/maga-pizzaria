import { AppDataSource } from "../data-source";
import { Customer } from "../models/customer.entity";

export const CustomerRepository = AppDataSource.getRepository(Customer);