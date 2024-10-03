import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Request, Response } from 'express';
import { localGuard } from './jwt/guard/local.guard';
import { jwtGuard } from './jwt/guard/jwt.guard';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private configService:ConfigService
  ) {}

  @UseGuards(localGuard)
  @Post()
  createToken(@Req() request:any,@Res() response:Response) {    
    const tokens= this.authService.create(request.user);
    response.cookie("acces_token",tokens.acces_token,{
      signed:true,
      httpOnly:true
    });

    response.cookie("refresh_token",tokens.refresh_token,{
      signed:true,
      httpOnly:true
    });

    response.status(200).json("Tokens creates");
  }
}
