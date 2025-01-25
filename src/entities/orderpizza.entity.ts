import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm";
import { Order } from "./order.entity";
import { Pizza } from "./pizza.entity";
import { Size } from "./size.entity";

@Entity()
export class OrderPizza {
    @PrimaryGeneratedColumn()
    op_id!: number;

    @ManyToOne(() => Order, (order) => order.orderPizzas, { onDelete: "CASCADE" })
    order!: Order;

    @ManyToOne(() => Pizza, (pizza) => pizza.orderPizzas, { eager: true })
    pizza!: Pizza;

    @ManyToOne(() => Size, (size) => size.orderPizzas, { eager: true })
    size!: Size;

    @Column()
    quantity!: number;

    @Column()
    price!: number;
}
