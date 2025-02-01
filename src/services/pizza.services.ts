import { PizzaRepository } from "../repositories/pizza.repository";
import { Pizza } from "../models/pizza.entity";

export class PizzaService {
    static async createPizza(flavor: string) {
        const pizza = PizzaRepository.create({ p_flavor: flavor });
        await PizzaRepository.save(pizza);
        return pizza;
    }

    static async getPizzas() {
        return await PizzaRepository.find();
    }

    static async getPizzaById(id: number) {
        return await PizzaRepository.findOne({ where: { p_id: id } });
    }
}