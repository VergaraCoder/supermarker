import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthGuard } from "@nestjs/passport";
import { Request ,Response} from "express";
import { Observable } from "rxjs";
import { AuthService } from "src/auth/auth.service";
import { manageError } from "src/common/erros/customError/maanage.error";



@Injectable()
export class jwtGuard implements CanActivate{

    constructor(
        private jwtService:JwtService,
        private AuthService:AuthService
    ){}

    async canActivate(context: ExecutionContext){
        const request:Request=context.switchToHttp().getRequest()
        const response:Response=context.switchToHttp().getResponse()
        const signedCookies2= request.signedCookies;
                
        if(signedCookies2["acces_token"]==undefined){
            throw new manageError({
                type:"UNAUTHORIZED",
                message:"THE TOKEN MUST TO BE"
            });
        }

        try{            
            
            const token=signedCookies2["acces_token"];
            if(token==false){
                throw new manageError({
                    type:"UNAUTHORIZED",
                    message:"NOT MODIFED TOKEN"
                });
            }
            
            await this.jwtService.verify(token,{ignoreExpiration:false});
            const decodeData=await this.jwtService.decode(token);
            request["user"]=decodeData;
            return true;

        }catch(err:any){
            console.log("the error is jwt guard", err.message);

            if(err.message == 'jwt expired'){              
                const token_refresh=signedCookies2["refresh_token"];
                
                const newAccessToken= await this.AuthService.createRenovateToken(token_refresh);
                
                response.cookie("acces_token", newAccessToken.acces_Token,{
                    signed:true,
                    httpOnly:true
                });
                request["user"]=newAccessToken.tokenDecode

                return true;
                
            }
            else if(err.message =="jwt must be a string" || err.message=="jwt must be provided"){
                throw new manageError({
                    type:"UNAUTHORIZED",
                    message:"THE TOKEN MUST BE PROVIDER"
                })
            }    
            throw manageError.signedErrors(err.message)      
        }
    }
}