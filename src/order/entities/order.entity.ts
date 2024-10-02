import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity("orders")
export class Order {
    @PrimaryGeneratedColumn("uuid")
    id:string;

    @Column()
    cartId:number;

    @Column()
    totalPrice:number
}
