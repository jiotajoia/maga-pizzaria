import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";

@Entity()
export class Pizza{
    @PrimaryGeneratedColumn()
    p_id!: number;

    @Column()
    p_flavor!: string;

    @ManyToMany(() => Order, (order) => order.pizzaId)
    orders!: Order[];
}