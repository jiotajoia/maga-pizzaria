import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderPizza } from "./orderpizza.entity";

@Entity()
export class Pizza{
    @PrimaryGeneratedColumn()
    p_id!: number;

    @Column()
    p_flavor!: string;

    @OneToMany(() => OrderPizza, (orderPizza) => orderPizza.pizza)
    orderPizzas!: OrderPizza[];
}