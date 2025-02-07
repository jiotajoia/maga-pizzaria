import { AppDataSource } from "../data-source";
import { Customer } from "../models/customer.entity";
import { Order } from "../models/order.entity";
import { OrderPizza } from "../models/orderpizza.entity";
import { Pizza } from "../models/pizza.entity";
import { Size } from "../models/size.entity";
import { OrderPizzaService } from "./orderPizza.services";


export class OrderService {
    
    static async createOrder(customerId: number, orderPizzas: { pizzaId: number; sizeId: number; quantity: number }[] = []) {
        const orderRepository = AppDataSource.getRepository(Order);
        const customerRepository = AppDataSource.getRepository(Customer);
        const pizzaRepository = AppDataSource.getRepository(Pizza);
        const sizeRepository = AppDataSource.getRepository(Size);
    
        // Verifica se orderPizzas é um array
        if (!Array.isArray(orderPizzas)) {
            throw new Error("orderPizzas deve ser um array");
        }
    
        // Buscando o cliente
        const customer = await customerRepository.findOne({ where: { c_id: customerId } });
        if (!customer) {
            throw new Error("Cliente não encontrado");
        }
    
        // Criando o pedido
        const order = orderRepository.create({
            orderDate: new Date(),
            customer: customer,
            totalAmount: 0,
            orderPizzas: [] // Inicializando a relação com orderPizzas
        });
    
        let totalAmount = 0;
    
        // Adicionando as pizzas ao pedido
        for (const item of orderPizzas) {
            const pizza = await pizzaRepository.findOne({ where: { p_id: item.pizzaId } });
            const size = await sizeRepository.findOne({ where: { s_id: item.sizeId } });
    
            if (!pizza || !size) {
                throw new Error("Pizza ou tamanho não encontrados");
            }
    
            // Criando a relação OrderPizza
            const orderPizza = new OrderPizza();
            orderPizza.pizza = pizza;
            orderPizza.size = size;
            orderPizza.quantity = item.quantity;
            orderPizza.price = size.price; // Assumindo que o preço está no objeto Size
            orderPizza.orderId = order.o_id;
    
            // Adicionando o OrderPizza no array orderPizzas
            order.orderPizzas.push(orderPizza);
    
            // Atualizando o total
            totalAmount += item.quantity * size.price;
        }
    
        // Atualizando o valor total do pedido
        order.totalAmount = totalAmount;
    
        // Salvando o pedido (com as pizzas associadas)
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
