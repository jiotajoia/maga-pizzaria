import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Timestamp } from "typeorm";
import { Customer } from "./customer.entity";
import { OrderPizza } from "./orderpizza.entity";

@Entity()
export class Order{
    @PrimaryGeneratedColumn()
    o_id!: number;

    @Column()
    orderDate!: Timestamp;

    @Column()
    totalAmount!: number;

    @ManyToOne(() => Customer, (customer: { orders: any; }) => customer.orders, { onDelete: "CASCADE" })
    customer!: Customer;

    @OneToMany(() => OrderPizza, (orderPizza) => orderPizza.order, { cascade: true })
    orderPizzas!: OrderPizza[];
}