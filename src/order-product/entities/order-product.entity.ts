import { Order } from "src/order/entities/order.entity";
import { Product } from "src/product/entities/product.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class OrderProduct {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    productId:number;

    @Column()
    orderId:number;

    @Column()
    quantity:number;

    @Column()
    totalPrice:number;

    @ManyToOne(()=>Order,order=>order.orderProduct)
    @JoinColumn({name:"productId"})
    order:Order;

    @ManyToOne(()=>Product,product=>product.orderProduct)
    @JoinColumn({name:"orderId"})
    product:Product;
}
