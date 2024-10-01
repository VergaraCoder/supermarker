import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthGuard } from "@nestjs/passport";
import { Request } from "express";
import { Observable } from "rxjs";
import { manageError } from "src/common/erros/customError/maanage.error";



@Injectable()
export class jwtGuard implements CanActivate{

    constructor(
        private jwtService:JwtService
    ){}

    async canActivate(context: ExecutionContext){
        const request:Request=context.switchToHttp().getRequest()
        const signedCookies2= request.signedCookies;
                
        if(signedCookies2["acces_token"]==undefined){
            throw new manageError({
                type:"UNAUTHORIZED",
                message:"THE TOKEN MUST TO BE"
            });
        }

        try{            
            const token=signedCookies2["acces_token"];
            await this.jwtService.verify(token,{ignoreExpiration:false});
            const decodeData=await this.jwtService.decode(token);
            request["user"]=decodeData;
            return true;

        }catch(err:any){
            console.log("the error is ", err.message);
            if(err.message == 'jwt expired'){
                console.log("paila entramos ");
                
            }else{                       
                throw manageError.signedErrors(err.message)
            }
        }
    }
}