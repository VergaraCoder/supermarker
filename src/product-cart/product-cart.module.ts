import { Module } from '@nestjs/common';
import { ProductCartService } from './product-cart.service';
import { ProductCartController } from './product-cart.controller';
import { ProductModule } from 'src/product/product.module';
import { CartModule } from 'src/cart/cart.module';
import { FilterProductCartService } from './filterProductCart.data.ts/filterproductCart';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCart } from './entities/product-cart.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([ProductCart]),
    ProductModule,
    CartModule
  ],
  controllers: [ProductCartController],
  providers: [ProductCartService,FilterProductCartService],
})
export class ProductCartModule {}
