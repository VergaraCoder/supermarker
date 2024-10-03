import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { querysProduct } from 'src/common/interface/querysProduct';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { FilterProductService } from './filterProduct/filterData.product';
import { manageError } from 'src/common/erros/customError/maanage.error';
import { Stock } from 'src/stock/entities/stock.entity';

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
    console.log(data);
    
    return data;
  }

  async findOne(id: string,quantity:number) {
    try{
      const dataOneProduct=await this.productRepository.findOneBy({id:id});
      if(!dataOneProduct){
        throw new manageError({
          type:"NOT_FOUND",
          message:"THIS ID OF PRODUCT DOES NOT EXIST"
        });
      }
      else if(dataOneProduct && dataOneProduct.stock[0].quantity<quantity){
        throw new manageError({
          type:"BAD_REQUEST",
          message:"THIS PRODUCT IS OUT OF STOCK"
        });
      }
      return dataOneProduct;
    }catch(err:any){
      throw manageError.signedErrors(err.message);
    }
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
