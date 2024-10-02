import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { timestamp } from "rxjs";


@Catch()
export class exceptionErrors implements ExceptionFilter{
    catch(exception: any, host: ArgumentsHost) {
        const request= host.switchToHttp().getRequest();
        const response=host.switchToHttp().getResponse();
        let message="";
        let status;
            
        const ifExist= exception.message.split(" :: ");
        
        const ifExist2=exception.response;
        

        if(exception.response.message){
            message=ifExist2.message;
            status=ifExist2.statusCode ? ifExist2.statusCode : 400;          
        }
        else if(ifExist.length==2){            
            message=ifExist[1];
            status=HttpStatus[exception.message.split(" :: ")[0]];
        }
        else{
            message=ifExist2 ? "Bad request" : "INTERNAL SERVER ERROR";
            status= ifExist2 ? 400 :500;
        }        
        response.status(status).json({
            status:status,
            timestamp:new Date(),
            method:request.method,
            path:request.url,
            message:message
        });
    }
}