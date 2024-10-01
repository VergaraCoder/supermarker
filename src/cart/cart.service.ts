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
      return data;
    }catch(err:any){

    }
  }

  findOne(id: number) {
    return `This action returns a #${id} cart`;
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

  update(id: number, updateCartDto: UpdateCartDto) {
    return `This action updates a #${id} cart`;
  }

  remove(id: number) {
    return `This action removes a #${id} cart`;
  }
}
