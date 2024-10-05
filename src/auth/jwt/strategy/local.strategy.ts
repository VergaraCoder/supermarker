import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "src/auth/auth.service";


@Injectable()
export class localStrategy extends PassportStrategy(Strategy){
    constructor(
        private AuthService:AuthService
    ){
        super({
            usernameField: 'email', 
            passwordField: 'password',
        });
    }

    async validate(email:string,password:string){
        try{
            console.log("enter");
            
            const User= await this.AuthService.verifyUser({email:email,password:password});
            const CartId=await this.AuthService.verifyCart(User.id);
            const user={
                idUser:User.id,
                email:User.email,
                role:User.role.nameRole,
                name:User.name,
                cartId:CartId
            };           
            console.log(user);
            
            return user;
        }catch(err:any){
            console.log("This error is in local guard ",err);
            throw err;
        }
    }
}