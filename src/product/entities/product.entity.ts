import { ProductCart } from "src/product-cart/entities/product-cart.entity";
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

    @OneToMany(()=>ProductCart,productCart=>productCart.product)
    productCart:ProductCart[];
}
