import "reflect-metadata";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderPizza } from "./orderpizza.entity";

@Entity()
export class Pizza{
    @PrimaryGeneratedColumn({ type: "int" })
    p_id!: number;

    @Column({ type: "varchar" })
    p_flavor!: string;

    @OneToMany(() => OrderPizza, (orderPizza) => orderPizza.pizza)
    orderPizzas!: OrderPizza[];
}