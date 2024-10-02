import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([Cart]),
    UserModule,
    AuthModule
  ],
  controllers: [CartController],
  providers: [CartService],
  exports:[TypeOrmModule]

})
export class CartModule {}
