import { Cart } from "src/cart/entities/cart.entity";
import { Product } from "src/product/entities/product.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("ProductsCart")
export class ProductCart {
    @PrimaryGeneratedColumn("uuid")
    id:string;

    @Column()
    cartId:number;

    @Column()
    productId:string;

    @Column()
    quantity:number;

    @ManyToOne(()=>Product,product=>product.productCart)
    @JoinColumn({name:"productId"})
    product:Product;

    @ManyToOne(()=>Cart,cart=>cart.productCart)
    @JoinColumn({name:"cartId"})
    cart:Cart;

}
