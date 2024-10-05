import { createProductCartDto } from './dto/createProductCart.ts/creation.productCart';
import { Injectable } from '@nestjs/common';
import { UpdateProductCartDto } from './dto/update-product-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductCart } from './entities/product-cart.entity';
import { Repository } from 'typeorm';
import { FilterProductCartService } from './filterProductCart.data.ts/filterproductCart';
import { ProductService } from 'src/product/product.service';
import { manageError } from 'src/common/erros/customError/maanage.error';

@Injectable()
export class ProductCartService {
  constructor(
    @InjectRepository(ProductCart)
    private productCartRepository:Repository<ProductCart>,
    private filterData:FilterProductCartService,
    private productService:ProductService
  ){}

  async create(createProductCart: any,infoUser:any) {
    try{
      
      const gruopData=await this.agroupDataToCreate(createProductCart);
      for(const product of gruopData){
        const dataCreated=this.productCartRepository.create({
          productId:product.id,
          cartId:infoUser.cartId,
          quantity:product.quantity
        });
        await this.productCartRepository.save(dataCreated);
      }
      return "perfectCreated"
    }catch(err:any){
      throw err;
    }
  }

  async findAll(cartId:number) {
    try{
      const returnProducts=await this.filterData.returnResults(this.productCartRepository,"all",cartId);
      if(returnProducts.length==0){
        throw new manageError({
          type:"NOT_FOUND",
          message:"DOES THERE ARE NOT PRODUCTS YET FOR THIS USER"
        });
      }
      return returnProducts;
    }catch(err:any){
      throw manageError.signedErrors(err.message);
    }
  }

  async findOne(cartId: number,productId:number) {
    try{
      const oneProductOfUser=await this.filterData.returnResults(this.productCartRepository,"one",{cartId,productId});
      if(!oneProductOfUser){
        throw new manageError({
          type:"NOT_FOUND",
          message:"THIS PRODUCTS NOT EXIST IN THE CART USER"
        });
      }
      return oneProductOfUser;
    }catch(err:any){
      throw manageError.signedErrors(err.message);
    }
  }

  async agroupDataToCreate(arrayOfProducts:any){
   try{      
     
     let arrayProducts=[];
     for(const productCart of arrayOfProducts){
       const product=await this.productService.findOne(productCart.productId,productCart.quantity);
       product["quantity"]=productCart.quantity;
       arrayProducts.push(product);
      }
      return arrayProducts;
   }catch(err:any){
    throw err;
   }
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
