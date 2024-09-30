import { HttpException, HttpStatus } from "@nestjs/common";

export class manageError extends Error{
    constructor({type,message}:{type:keyof typeof HttpStatus,message:string}){
        super(`${type} :: ${message}`);
    }

    public static signedErrors(message:string){
        const nameError= message.split(" :: ")[0];
        if(nameError){
            throw new HttpException(message,HttpStatus[nameError]);
        }else{
            throw new HttpException(message,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}