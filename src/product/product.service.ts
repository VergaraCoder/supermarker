import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { querysProduct } from 'src/common/interface/querysProduct';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { FilterProductService } from './filterProduct/filterData.product';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository:Repository<Product>,
    private filterProductService:FilterProductService
  ) {}
  async create(createProductDto: CreateProductDto) {
    const data= this.productRepository.create(createProductDto);
    await this.productRepository.save(data);
    return data;
  }

  async findAll(querys:querysProduct) {
    const data= await this.filterProductService.returnResults(querys,this.productRepository);
    return data;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
