import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Timestamp } from "typeorm";
import { Customer } from "./customer.entity";
import { OrderPizza } from "./orderpizza.entity";
import "reflect-metadata";

@Entity()
export class Order{
    @PrimaryGeneratedColumn({ type: "int" })
    o_id!: number;

    @Column({ type: "timestamp" })
    orderDate!: Timestamp;

    @Column({ type: "int" })
    totalAmount!: number;

    @ManyToOne(() => Customer, (customer: { orders: any; }) => customer.orders, { onDelete: "CASCADE" })
    customer!: Customer;

    @OneToMany(() => OrderPizza, (orderPizza) => orderPizza.orderId, { cascade: true })
    orderPizzas!: OrderPizza[];
}