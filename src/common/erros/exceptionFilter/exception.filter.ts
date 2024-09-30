import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { timestamp } from "rxjs";


@Catch()
export class exceptionErrors implements ExceptionFilter{
    catch(exception: any, host: ArgumentsHost) {
        const request= host.switchToHttp().getRequest();
        const response=host.switchToHttp().getResponse();
        let message="";
        let status=0;

        const ifExist= exception.message.split(" :: ");
        const ifExist2=exception.response;

        if(ifExist && ifExist.length==2){
            message= ifExist[0];
            status=ifExist[1];
        }
        else if(ifExist2){
            message= ifExist2.message ? ifExist2.message : "Bad Request"
            status=ifExist2.error;
        }
        else{
            message="INTERL SERVER ERROR";
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