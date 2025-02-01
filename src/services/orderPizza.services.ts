import { AppDataSource } from "../data-source";
import { Order } from "../models/order.entity";
import { OrderPizza } from "../models/orderpizza.entity";
import { Pizza } from "../models/pizza.entity";
import { Size } from "../models/size.entity";


export class OrderPizzaService {
    
    static async addPizzaToOrder(orderId: number, pizzaId: number, sizeId: number, quantity: number) {
        const orderRepository = AppDataSource.getRepository(Order);
        const pizzaRepository = AppDataSource.getRepository(Pizza);
        const sizeRepository = AppDataSource.getRepository(Size);
        const orderPizzaRepository = AppDataSource.getRepository(OrderPizza);

        // Verifica se a ordem existe
        const order = await orderRepository.findOne({ where: { o_id: orderId } });
        if (!order) {
            throw new Error("Pedido não encontrado");
        }

        // Verifica se a pizza existe
        const pizza = await pizzaRepository.findOne({ where: { p_id: pizzaId } });
        if (!pizza) {
            throw new Error("Pizza não encontrada");
        }

        // Verifica se o tamanho existe
        const size = await sizeRepository.findOne({ where: { s_id: sizeId } });
        if (!size) {
            throw new Error("Tamanho não encontrado");
        }

        // Criar o item de pedido
        const orderPizza = orderPizzaRepository.create({
            orderId: order.o_id,
            pizza,
            size,
            quantity,
            price: size.s_price * quantity
        });

        await orderPizzaRepository.save(orderPizza);

        // Atualizar o valor total do pedido
        order.totalAmount += orderPizza.price;
        await orderRepository.save(order);

        return orderPizza;
    }

    static async getOrderPizzas(orderId: number) {
        const orderPizzaRepository = AppDataSource.getRepository(OrderPizza);
        return await orderPizzaRepository.find({
            where: { orderId: orderId  },
            relations: ["order", "pizza", "size"]
        });
    }

    static async removePizzaFromOrder(orderPizzaId: number) {
        const orderPizzaRepository = AppDataSource.getRepository(OrderPizza);
        const orderPizza = await orderPizzaRepository.findOne({
            where: { op_id: orderPizzaId },
            relations: ["order"]
        });

        if (!orderPizza) {
            throw new Error("Item do pedido não encontrado");
        }

        // Atualizar o total da ordem antes de remover o item
        const orderRepository = AppDataSource.getRepository(Order);
        const order = await orderRepository.findOne({ where: { o_id: orderPizza.orderId } });

        if (order) {
            order.totalAmount -= orderPizza.price;
            await orderRepository.save(order);
        }

        await orderPizzaRepository.remove(orderPizza);
    }
}
