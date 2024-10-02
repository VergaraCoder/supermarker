import { Injectable } from '@nestjs/common';
import { CreateOrderProductDto } from './dto/create-order-product.dto';
import { UpdateOrderProductDto } from './dto/update-order-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderProduct } from './entities/order-product.entity';
import { Repository } from 'typeorm';
import { FilterOrderProductsService } from './filterOrdersProducts/filterOrderProducts.data';
import { manageError } from 'src/common/erros/customError/maanage.error';

@Injectable()
export class OrderProductService {
  constructor(
    @InjectRepository(OrderProduct)
    private orderRepository:Repository<OrderProduct>,
    private filterData:FilterOrderProductsService
  ){}
  async create(createOrderProductDto: CreateOrderProductDto) {
    return 'This action adds a new orderProduct';
  }

  async findAll() {
    return `This action returns all orderProduct`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} orderProduct`;
  }

  async update(id: number, updateOrderProductDto: UpdateOrderProductDto) {
    return `This action updates a #${id} orderProduct`;
  }

  async removeAllProducts(id: string) {
    try{
      const {affected}=await this.orderRepository.delete(id);
      if(affected==0){
        throw new manageError({
          type:"NOT_FOUND",
          message:"PRODUCTS OF ORDER NOT FOUND "
        });
      }
      return "Delete allProducts of order"
    }catch(err:any){

    }
  }

  async removeSomeProduct(idProducts:number[]) {
    try{
      const response=await this.filterData.returnResults(this.orderRepository,"delete",idProducts);
      return response;
    }catch(err:any){
      throw err;
    }
  }
}
