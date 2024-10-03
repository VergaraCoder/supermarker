import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { dataUser } from 'src/common/interface/interface.jwt';
import * as crypt from 'bcrypt';
import { manageError } from 'src/common/erros/customError/maanage.error';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    private jwtService:JwtService,
    private userService:UserService
  ){}

  create(createAuthDto: any) {
    const acces_token=this.jwtService.sign(createAuthDto,{expiresIn:'30s'});
    const refresh_token=this.jwtService.sign(createAuthDto,{expiresIn:'10d'});
    
    return {
      acces_token,
      refresh_token
    }
  }

  async createRenovateToken(tokenRefresh:string){
    try{
      await this.jwtService.verify(tokenRefresh);
      const tokenDecode= await this.jwtService.decode(tokenRefresh);
      delete tokenDecode.iat;
      delete tokenDecode.exp;
      const acces_Token= this.jwtService.sign(tokenDecode,{expiresIn:'30s'});
      return {
        tokenDecode,
        acces_Token
      }
    }catch(err:any){
      if(err instanceof jwt.JsonWebTokenError ){
        throw new manageError({
          type:"NOT_ACCEPTABLE",
          message:"THE TOKEN IS NOT VALID"
        });
      }
      else if(err instanceof jwt.TokenExpiredError || err instanceof jwt.NotBeforeError){
        throw new manageError({
          type:"UNAUTHORIZED",
          message:"THE TOKEN EXPIRED"
        });
      }
      throw manageError.signedErrors(err.message);
    }
  }

  async verifyUser(dataUser:dataUser){
    try{
      const User=await this.userService.findByEmail(dataUser.email);
      if(!await crypt.compare(dataUser.password,User.password)){
        throw new manageError({
          type:"UNAUTHORIZED",
          message:"INCORRECT CREDENTIALS"
        });
      }
      return User;
    }catch(err:any){  
      throw manageError.signedErrors(err.message);
    }
  }
}
