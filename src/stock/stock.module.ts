import { Module } from '@nestjs/common';
import { StockService } from './stock.service';
import { StockController } from './stock.controller';
import { ProductModule } from 'src/product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stock } from './entities/stock.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Stock]),
    ProductModule
  ],
  controllers: [StockController],
  providers: [StockService],
  exports:[TypeOrmModule]

})
export class StockModule {}
