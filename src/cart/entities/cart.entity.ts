import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("cart")
export class Cart {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    userId:string;

    @ManyToOne(()=>User,user=>user,{eager:true})
    @JoinColumn({name:"userId"})
    user:User;
}
