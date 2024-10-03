import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { FilterProductService } from './filterProduct/filterData.product';

@Module({
  imports:[
    TypeOrmModule.forFeature([Product]),
  ],
  controllers: [ProductController],
  providers: [ProductService,
  FilterProductService],
  exports:[TypeOrmModule,ProductService]

})
export class ProductModule {}
