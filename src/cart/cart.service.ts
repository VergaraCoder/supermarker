import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { Repository } from 'typeorm';
import { manageError } from 'src/common/erros/customError/maanage.error';

@Injectable()
export class CartService {

  constructor(
    @InjectRepository(Cart) private cartRepository:Repository<Cart>
  ){}
  async create(createCartDto: CreateCartDto) {
    try{
      await this.verifyCart(createCartDto.userId);

      const createCart= this.cartRepository.create(createCartDto);

      await this.cartRepository.save(createCart);

      return createCart;
    }catch(err:any){
      console.log("the is un create cart method ",err);
      throw err;
    }
  }

  async findAll() {
    try{
      const data= await this.cartRepository.find();
      if(!data){
        throw new manageError({
          type:"NOT_FOUND",
          message:"THERE IS NOT REGISTERS OF CARTS"
        });
      }
      return data;
    }catch(err:any){
      throw manageError.signedErrors(err.message);
    }
  }

  async findOne(id: number) {
    try{
      const oneCart=await this.cartRepository.findOne({where:{id:id}});      
      if(!oneCart){        
        throw new manageError({
          type:"NOT_FOUND",
          message:"THERE IS NOT REGISTER OF CART WITH THIS ID"
        });
      }
      return oneCart;
    }catch(err:any){
      throw manageError.signedErrors(err.message);
    }
  }

  async verifyCart(id: string) {
    try{
      const cart=await this.cartRepository.findOne({where:{userId:id}});
      if(cart){
        throw new manageError({
          type:"CONFLICT",
          message:"THIS USER ALREADY HAS A CART ACTIVE"
        });
      }
    }catch(err:any){
      throw manageError.signedErrors(err.message);
    }
  }

  async update(id: number, updateCartDto: UpdateCartDto) {
    try{
      const update= await this.cartRepository.update(id,updateCartDto);      
      if(update.affected===0){
        throw new manageError({
          type:"NOT_FOUND",message:"THIS CART DOES NOT EXIST FOR UPDATE"
        });
      }
      return "update correctly";
    }catch(err:any){
      console.log(`This error is service update cart ${err} `);
      throw manageError.signedErrors(err.message);
    }
  }

  async remove(id: number) {
    try{
      const deleteCart= await this.cartRepository.delete(id);
      if(deleteCart.affected==0){
        throw new manageError({
          type:"NOT_FOUND",message:"THIS CART DOES NOT EXIST"
        });
      }
      return "delete correctly";
    }catch(err:any){
      throw manageError.signedErrors(err.message);
    }
  }
}
