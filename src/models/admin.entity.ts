import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import "reflect-metadata"

@Entity()
export class Admin {
    @PrimaryGeneratedColumn({ type: "int" })
    a_id!: number;

    @Column({ type: "varchar" })
    name!: string;

    @Column({ type: "varchar" })
    email!: string;

    @Column({ type: "varchar" })
    password!: string;
}