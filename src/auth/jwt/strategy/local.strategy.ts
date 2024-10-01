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
            usernameField:"email",
            passwordField:"password"
        })
    }

    async validate(email:string,password:string){
        try{
            const User= await this.AuthService.verifyUser({email:email,password:password});
            console.log(User);
            
            const user={
                idUser:User.id,
                email:User.email,
                role:User.role.nameRole,
                name:User.name
            };
            console.log("Pasamos ya ");
            
            
            return user;
        }catch(err:any){
            
        }
    }
}