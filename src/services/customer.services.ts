import { CustomerRepository } from "../repositories/customer.repository";
import { Customer } from "../models/customer.entity";

export class CustomerService {
    static async createCustomer(name: string, neighbor: string, phone: string, address: string) {
            const customer = CustomerRepository.create({ name: name, neighbor: neighbor, phone: phone, address: address });
            await CustomerRepository.save(customer);
            return customer;
        }

        static async getCustomers() {
            return await CustomerRepository.find();
        }
}