import { OrderProduct } from "src/order-product/entities/order-product.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity("orders")
export class Order {
    @PrimaryGeneratedColumn("uuid")
    id:string;

    @Column()
    cartId:number;

    @OneToMany(()=>OrderProduct,orderproduct=>orderproduct.order)
    orderProduct:OrderProduct[];
}
