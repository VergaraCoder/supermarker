import { Module } from '@nestjs/common';
import { OrderProductService } from './order-product.service';
import { OrderProductController } from './order-product.controller';
import { OrderModule } from 'src/order/order.module';
import { ProductModule } from 'src/product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderProduct } from './entities/order-product.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([OrderProduct]),
    OrderModule,
    ProductModule
  ],
  controllers: [OrderProductController],
  providers: [OrderProductService],
  exports:[TypeOrmModule]

})
export class OrderProductModule {}
