import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { FilterOrderService } from './filterOrder/filterData.order';

@Module({
  imports:[
    TypeOrmModule.forFeature([Order]),
  ],
  controllers: [OrderController],
  providers: [OrderService,FilterOrderService],
  exports:[TypeOrmModule]

})
export class OrderModule {}
