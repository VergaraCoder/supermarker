import { OrderProduct } from "src/order-product/entities/order-product.entity";
import { Stock } from "src/stock/entities/stock.entity";
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("products")
export class Product {
    @PrimaryGeneratedColumn("uuid")
    id:string;

    @Column()
    name:string;

    @Column()
    price:number;

    @OneToMany(()=>Stock,stock=>stock.product,{eager:true})
    stock:Stock[];

    @OneToMany(()=>OrderProduct,orderproduct=>orderproduct.product)
    orderProduct:OrderProduct[];
}
