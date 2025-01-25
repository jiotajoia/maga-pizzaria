import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";

@Entity()
export class Customer{
    @PrimaryGeneratedColumn()
    c_id!: number

    @Column()
    _name!: string

    @Column()
    neighbor!: string
    
    @Column()
    phone!: string

    @Column()
    address!: string;
    
    @OneToMany(() => Order, (order) => order.customerId)
    orders!: Order[];
}