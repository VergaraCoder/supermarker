import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { manageError } from 'src/common/erros/customError/maanage.error';
import { UpdateAuthDto } from 'src/auth/dto/update-auth.dto';
import { FilterOrderService } from './filterOrder/filterData.order';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository:Repository<Order>,
    private filterOrder:FilterOrderService
  ){}

  async create(createOrderDto: CreateOrderDto) {
    try{
       await this.verifyOrder(createOrderDto.cartId);
       const createOrder= this.orderRepository.create(createOrderDto);
       await this.orderRepository.save(createOrder);
       return createOrder;
    }catch(err:any){
      throw err;
    }
  }

  async findAll() {
   try{
    const dataOrders=await this.orderRepository.find();
    if(!dataOrders){
      throw new manageError({
        type:"NOT_FOUND",
        message:"THERE ARE NO ORDERS YET."
      });
    }
    return dataOrders;
   }catch(err:any){
    throw manageError.signedErrors(err.message);
   }
  }

  async verifyOrder(cartId:number){
    try{
      const dataOrder=await this.orderRepository.findOneBy({cartId});
      if(dataOrder){
        throw new manageError({
          type:"CONFLICT",
          message:"THIS ORDER IS STILL ACTIVE."
        });
      }
      return true;
    }catch(err:any){
      throw manageError.signedErrors(err.message);
    }
  }

  async findOne(id: string) {
    try{
      const dataOneOrder=await this.filterOrder.returnResult(this.orderRepository);
      if(!dataOneOrder){
        throw new manageError({
          type:"NOT_FOUND",
          message:"THAT ORDER NOT EXIST"
        });
      }
      return dataOneOrder;
    }catch(err:any){
      throw manageError.signedErrors(err.message);
    }
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    try{
      const {affected}=await this.orderRepository.update(id,updateOrderDto);
      if(affected==0){
        throw new manageError({
          type:"NOT_FOUND",
          message:"THE ORDER CANNOT BE UPDATED."
        });
      }
      return "perfectly update";
    }catch(err:any){
      throw manageError.signedErrors(err.message);
    }
  }

  async remove(id: string) {
    try{
      const {affected}=await this.orderRepository.delete(id);
      if(affected==0){
        throw new manageError({
          type:"NOT_FOUND",
          message:"ORDER NOT FOUND"
        });
      }
        return "order deleted";
    }catch(err:any){
      throw manageError.signedErrors(err.message);
    } 
  }
}
