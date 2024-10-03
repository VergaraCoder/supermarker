import { createProductCartDto } from './dto/createProductCart.ts/creation.productCart';
import { Injectable } from '@nestjs/common';
import { UpdateProductCartDto } from './dto/update-product-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductCart } from './entities/product-cart.entity';
import { Repository } from 'typeorm';
import { FilterProductCartService } from './filterProductCart.data.ts/filterproductCart';
import { ProductService } from 'src/product/product.service';

@Injectable()
export class ProductCartService {
  constructor(
    @InjectRepository(ProductCart)
    private productCartRepository:Repository<ProductCart>,
    private filterData:FilterProductCartService,
    private productService:ProductService
  ){}

  async create(createProductCartDto: createProductCartDto) {
    try{
      console.log(createProductCartDto);
      
      for(const productCart of createProductCartDto.productCart){
        const product=await this.productService.findOne(productCart.productId,productCart.quantity);

      }
        //return productCart;
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
