import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { dataUser } from 'src/common/interface/interface.jwt';
import * as crypt from 'bcrypt';
import { manageError } from 'src/common/erros/customError/maanage.error';

@Injectable()
export class AuthService {
  constructor(
    private jwtService:JwtService,
    private userService:UserService
  ){}

  create(createAuthDto: CreateAuthDto) {
    const acces_token=this.jwtService.sign(createAuthDto,{expiresIn:'30m'});
    const refresh_token=this.jwtService.sign(createAuthDto,{expiresIn:'10d'});
    
    return {
      acces_token,
      refresh_token
    }
  }

  findAll(hola:any) {
    return `This action returns all auth`;
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
