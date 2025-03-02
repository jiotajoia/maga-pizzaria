import "reflect-metadata"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderPizza } from "./orderpizza.entity";

@Entity()
export class Size{
    @PrimaryGeneratedColumn({ type: "int" })
    s_id!: number;

    @Column({ type: "varchar" })
    s_size!: string;

    @Column("decimal", { precision: 10, scale: 2 })
    s_price!: number;
    
    @OneToMany(() => OrderPizza, (orderPizza) => orderPizza.size)
    orderPizzas!: OrderPizza[];
}