// import { Injectable } from "@nestjs/common";
// import { ConfigService } from "@nestjs/config";
// import { JwtService } from "@nestjs/jwt";
// import { PassportStrategy } from "@nestjs/passport";
// import { NextFunction, Request } from "express";
// import { ExtractJwt, Strategy } from "passport-jwt";
// import { AuthService } from "src/auth/auth.service";
// import { manageError } from "src/common/erros/customError/maanage.error";



// @Injectable()
// export class jwtStrategy extends PassportStrategy(Strategy){
//     constructor(
//         configService:ConfigService, 
//         private jwtService:JwtService,
//     ){       
//         super({
//             jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
//             ignoreExpiration:false,
//             secretOrKey:configService.get<string>("JWT_SECRET"),
//         })
//     }

//     async validation(dataUser:any){
        
//         return {
//             idUser:dataUser.id,
//             email:dataUser.email,
//             role:dataUser.role,
//             name:dataUser.name
//         }
//     }
// }