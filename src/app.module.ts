import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { CartModule } from './cart/cart.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { OrderProductModule } from './order-product/order-product.module';
import { StockModule } from './stock/stock.module';

@Module({
  imports: [UserModule, RoleModule, CartModule, ProductModule, OrderModule, OrderProductModule, StockModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
