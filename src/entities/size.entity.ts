import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";

@Entity()
export class Size{
    @PrimaryGeneratedColumn()
    s_id!: number;

    @Column()
    s_size!: string;

    @Column()
    s_price!: number;
    
    @OneToMany(() => Order, (order) => order.sizeId)
    orders!: Order[];
}