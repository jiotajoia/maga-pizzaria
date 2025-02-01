import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm";
import { Order } from "./order.entity";
import { Pizza } from "./pizza.entity";
import { Size } from "./size.entity";
import "reflect-metadata";

@Entity()
export class OrderPizza {
    @PrimaryGeneratedColumn({ type: "int" })
    op_id!: number;

    @Column({ type: "int" })
    orderId!: number;

    @ManyToOne(() => Pizza, (pizza) => pizza.orderPizzas, { eager: true })
    pizza!: Pizza;

    @ManyToOne(() => Size, (size) => size.orderPizzas, { eager: true })
    size!: Size;

    @Column({ type: "int" })
    quantity!: number;

    @Column({ type: "int" })
    price!: number;
}
