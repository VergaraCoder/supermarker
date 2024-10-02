import { Product } from "src/product/entities/product.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("stock")
export class Stock {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    productId:string;

    @Column()
    weighing:string;

    @Column()
    quantity:number;

    @Column()
    unitLessForHowManyDishes:number

    @ManyToOne(()=>Product,product=>product.stock)
    product:Product[];
}
