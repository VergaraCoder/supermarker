import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { FilterUserService } from './filterUser/filter.userService';
import { query } from 'express';
import { manageError } from 'src/common/erros/customError/maanage.error';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository:Repository<User>,
    private filterData:FilterUserService
  ){}

  async create(createUserDto: CreateUserDto) {
    try{
      // const verifyUser=await this.findByEmail(createUserDto);
      // if(verifyUser){
      //   throw new manageError({
      //     type:"CONFLICT",
      //     message:"THIS USER ALREADY EXIST"
      //   });
      // }
      //const createUser=this.userRepository.create(createUserDto);
      //await this.userRepository.save(createUser);
    }catch(err:any){
      throw manageError.signedErrors(err.message);
    }
  }

  async findAll(querys:any) {
    try{
      const data=await this.filterData.returnResults(querys,this.userRepository);
      if(!data){
        throw new manageError({
          type:"NOT_FOUND",
          message:"THERE IS NOT DATA WITH THAT CARACTERISTCS"
        });
      }
    }catch(err:any){
      throw manageError.signedErrors(err.message);
    }
  }

  async findOne(id: string) {
    try{
      const dataUser=await this.userRepository.findOne({where:{id:id}});
      if(!dataUser){
        throw new manageError({
          type:"NOT_FOUND",
          message:"THERE IS NOT SOME USER WITH THIS ID"
        });
      }
    return dataUser;
    }catch(err:any){
      throw manageError.signedErrors(err.message);
    }
  }

  async findByEmail(email:string){
    try{
      const dataUser=await this.userRepository.findBy({email});
      if(!dataUser){
        throw new manageError({
          type:"NOT_FOUND",
          message:"THIS EMAIL NOT EXIST "
        });
      }
      return dataUser;
    }catch(err:any){
      throw manageError.signedErrors(err.message);
    }
  }

  // async update(id: string, updateUserDto: UpdateUserDto) {
  //   try{
  //     //const dataUser=await this.userRepository.update(id,updateUserDto);
  //     if(!dataUser){
  //       throw new manageError({
  //         type:"BAD_REQUEST",
  //         message:"IT CANNOT UPDATE THIS USER"
  //       });
  //     }
  //     return dataUser;
  //   }catch(err:any){
  //     throw manageError.signedErrors(err.message);
  //   }
  // }

  async remove(id: string) {
    const deleteUser=await this.userRepository.delete(id);
    if(!deleteUser){
      throw new manageError({
        type:"BAD_REQUEST",
        message:"THIS IT CANNOT DELETE "
      });
    }
    return deleteUser;
  }
}
