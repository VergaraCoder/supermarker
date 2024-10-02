import { Injectable } from '@nestjs/common';
import { CreateProductCartDto } from './dto/create-product-cart.dto';
import { UpdateProductCartDto } from './dto/update-product-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductCart } from './entities/product-cart.entity';
import { Repository } from 'typeorm';
import { FilterProductCartService } from './filterProductCart.data.ts/filterproductCart';

@Injectable()
export class ProductCartService {
  constructor(
    @InjectRepository(ProductCart)
    private productCartRepository:Repository<ProductCart>,
    private filterData:FilterProductCartService
  ){}

  async create(createProductCartDto: CreateProductCartDto) {
    try{
        const productCart=this.productCartRepository.create(createProductCartDto);
        await this.productCartRepository.save(productCart);
        return productCart;
    }catch(err:any){
      throw err;
    }
  }

  async findAll() {
    try{
      const cartId=1;
      const returnProducts=await this.filterData.returnResults(this.productCartRepository,"all",cartId);
    }catch(err:any){

    }
  }

  async findOne(id: number) {
    return `This action returns a #${id} productCart`;
  }

  async verifyProduct(id: number) {
    return `This action returns a #${id} productCart`;
  }

  async update(id: number, updateProductCartDto: UpdateProductCartDto) {
    return `This action updates a #${id} productCart`;
  }

  async remove(id: number) {
    return `This action removes a #${id} productCart`;
  }
}
