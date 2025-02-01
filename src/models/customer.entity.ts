import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";
import "reflect-metadata"

@Entity()
export class Customer{
    @PrimaryGeneratedColumn({ type: "int" })
    c_id!: number

    @Column({ type: "varchar" })
    name!: string

    @Column({ type: "varchar" })
    neighbor!: string
    
    @Column({ type: "varchar" })
    phone!: string

    @Column({ type: "varchar" })
    address!: string;
    
    @OneToMany(() => Order, (order) => order.customer)
    orders!: Order[];
}