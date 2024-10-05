import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { FilterOrderService } from './filterOrder/filterData.order';
import { CommonModule } from 'src/common/common.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([Order]),
    CommonModule,
    AuthModule
  ],
  controllers: [OrderController],
  providers: [OrderService,FilterOrderService],
  exports:[TypeOrmModule]

})
export class OrderModule {}
