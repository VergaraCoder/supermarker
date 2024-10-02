import { ProductCart } from "src/product-cart/entities/product-cart.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("cart")
export class Cart {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    userId:string;

    @ManyToOne(()=>User,user=>user,{eager:true})
    @JoinColumn({name:"userId"})
    user:User;

    @OneToMany(()=>ProductCart,productCart=>productCart.cart,{eager:true})
    productCart:ProductCart[];
}
