import { AppDataSource } from "../data-source";
import { Customer } from "../models/customer.entity";
import { Order } from "../models/order.entity";
import { OrderPizza } from "../models/orderpizza.entity";
import { OrderPizzaService } from "./orderPizza.services";


export class OrderService {
    
    static async createOrder(customerId: number, orderPizzas: { pizzaId: number; sizeId:1; quantity: number }[]) {
        const orderRepository = AppDataSource.getRepository(Order);
        const customerRepository = AppDataSource.getRepository(Customer);
        const orderPizzaRepository = AppDataSource.getRepository(OrderPizza);

        const customer = await customerRepository.findOne({ where: { c_id: customerId } });
        if (!customer) {
            throw new Error("Cliente não encontrado");
        }

        const order = orderRepository.create({
            orderDate: new Date(),
            customer: customer,
            totalAmount: 0,
        });

        await orderRepository.save(order);

        let totalAmount = 0;

        for (const item of orderPizzas) {
            const orderPizza = await OrderPizzaService.addPizzaToOrder(order.o_id, item.pizzaId, item.sizeId , item.quantity);

            await orderPizzaRepository.save(orderPizza);
            totalAmount += item.quantity * orderPizza.size.price; 
        }

        order.totalAmount = totalAmount;
        await orderRepository.save(order);

        return order;
    }

    static async getAllOrders() {
        const orderRepository = AppDataSource.getRepository(Order);
        return await orderRepository.find({
            relations: ["customer", "orderPizzas"],
        });
    }

    static async getOrderById(orderId: number) {
        const orderRepository = AppDataSource.getRepository(Order);
        return await orderRepository.findOne({
            where: { o_id: orderId },
            relations: ["customer", "orderPizzas"],
        });
    }

    static async deleteOrder(orderId: number) {
        const orderRepository = AppDataSource.getRepository(Order);
        await orderRepository.delete(orderId);
    }
}
