import { Module } from '@nestjs/common';
import { StockService } from './stock.service';
import { StockController } from './stock.controller';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports:[
    ProductModule
  ],
  controllers: [StockController],
  providers: [StockService],
})
export class StockModule {}
