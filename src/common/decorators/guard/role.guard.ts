import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { KEY_VALUES } from "../role.decorator";
import { manageError } from "src/common/erros/customError/maanage.error";


@Injectable()
export class RoleGuard implements CanActivate{
    constructor(private reflector:Reflector){}
    async canActivate(context: ExecutionContext) {
        
        const request= context.switchToHttp().getRequest();
        const roles=this.reflector.get(KEY_VALUES,context.getHandler());

        if(!roles.includes(request.user.role)){
            throw new manageError({
                type:"UNAUTHORIZED",
                message:"USER IS NOT AUTHORIZED"
            });
        }

        return true;
    }
}