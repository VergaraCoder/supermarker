import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { CartModule } from './cart/cart.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { StockModule } from './stock/stock.module';
import { CommonModule } from './common/common.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import {tyormCredenctials} from './common/dataBase/dbConfig/db.config';
import { AuthModule } from './auth/auth.module';
import { APP_FILTER } from '@nestjs/core';
import { exceptionErrors } from './common/erros/exceptionFilter/exception.filter';
import { ProductCartModule } from './product-cart/product-cart.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath:".env"
    }),
    TypeOrmModule.forRootAsync({
      useClass:tyormCredenctials
    }),
  UserModule,
  RoleModule, 
  CartModule, 
  ProductModule, 
  OrderModule, 
  StockModule, 
  CommonModule, 
  AuthModule, ProductCartModule],
  controllers: [],
  providers: [
    {
      provide:APP_FILTER,
      useClass:exceptionErrors
    }
  ],
})
export class AppModule {}
