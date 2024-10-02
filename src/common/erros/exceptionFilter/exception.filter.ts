import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { timestamp } from "rxjs";


@Catch()
export class exceptionErrors implements ExceptionFilter{
    catch(exception: any, host: ArgumentsHost) {
        const request= host.switchToHttp().getRequest();
        const response=host.switchToHttp().getResponse();
        let message="";
        let status;
        
        console.log(exception);
        
        
        const ifExist= exception.message.split(" :: ");
        const ifExist2=exception.response;
        

        if(ifExist2){
            message=ifExist2.message  ;
            status=ifExist2.statusCode;
        }
        else if(ifExist){
            message=ifExist[1];
            status=HttpStatus[exception.message.split(" :: ")[0]];
        }
        else{
            message="INTERNAL SERVER ERROR";
            status=500;
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