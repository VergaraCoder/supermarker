import { Module } from '@nestjs/common';
import { OrderProductService } from './order-product.service';
import { OrderProductController } from './order-product.controller';
import { OrderModule } from 'src/order/order.module';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports:[
    OrderModule,
    ProductModule
  ],
  controllers: [OrderProductController],
  providers: [OrderProductService],
})
export class OrderProductModule {}
