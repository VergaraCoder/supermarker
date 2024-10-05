import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { FilterProductService } from './filterProduct/filterData.product';
import { AuthModule } from 'src/auth/auth.module';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([Product]),
    AuthModule,
    CommonModule
  ],
  controllers: [ProductController],
  providers: [ProductService,
  FilterProductService],
  exports:[TypeOrmModule,ProductService]

})
export class ProductModule {}
