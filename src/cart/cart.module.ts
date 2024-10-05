import { forwardRef, Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([Cart]),
    forwardRef(()=>UserModule),
    forwardRef(()=>AuthModule)
  ],
  controllers: [CartController],
  providers: [CartService],
  exports:[
    TypeOrmModule,
    CartService
  ]

})
export class CartModule {}
