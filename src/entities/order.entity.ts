import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, Timestamp } from "typeorm";
import { Customer } from "./customer.entity";
import { Size } from "./size.entity";
import { Pizza } from "./pizza.entity";

@Entity()
export class Order{
    @PrimaryGeneratedColumn()
    o_id!: number;

    @Column()
    orderDate!: Timestamp;

    @Column()
    customerId!: number;

    @Column()
    sizeId!: number;
    
    @Column()
    pizzaId!: number;
    
    @Column()
    totalAmount!: number;

    @ManyToOne(() => Customer, (customer: { orders: any; }) => customer.orders, { onDelete: "CASCADE" })
    customer!: Customer;

    @ManyToOne(() => Size, (size) => size.orders, { onDelete: "CASCADE" })
    size!: Size;

    @ManyToMany(() => Pizza, (pizza) => pizza.orders, { cascade: true })
    @JoinTable()
    pizzas!: Pizza[];
}