import { Cart } from "src/cart/entities/cart.entity";
import { Role } from "src/role/entities/role.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity("users")
@Unique(["email"])
export class User {
    @PrimaryGeneratedColumn("uuid")
    id:string;

    @Column()
    name:string;

    @Column()
    email:string;

    @Column()
    password:string;

    @Column()
    roleId:number;

    @ManyToOne(()=>Role,role=>role.user)
    @JoinColumn({name:"roleId"})
    role:Role;

    @OneToMany(()=>Cart,cart=>cart.user)
    cart:Cart[];
}
