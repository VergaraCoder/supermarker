import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { FilterUserService } from './filterUser/filter.userService';
import { query } from 'express';
import { manageError } from 'src/common/erros/customError/maanage.error';
import { RoleService } from 'src/role/role.service';
import * as encryptar from 'bcrypt';
import { filterDataUpdate } from './returnDataUpdate/data.ok';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository:Repository<User>,
    private filterData:FilterUserService,
    private roleService:RoleService,
    private filterUpdateData:filterDataUpdate
  ){}

  async create(createUserDto: CreateUserDto) {
    try{
      const verifyRole=await this.roleService.findOne(createUserDto.role);
      const verifyUser=await this.findByEmail(createUserDto.email,"ve");
      
      if(verifyUser && verifyUser.length>0){
        throw new manageError({
          type:"CONFLICT",
          message:"THIS USER ALREADY EXIST"
        });
      }
      const createUser=this.userRepository.create({
        name:createUserDto.name,
        email:createUserDto.email,
        password :await encryptar.hash(createUserDto.password,10),
        roleId:verifyRole.id
      });
      await this.userRepository.save(createUser);
      return createUser;
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
      return data;
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

  async findByEmail(email:string, other?:any){
    try{
      const dataUser=await this.userRepository.findBy({email});
  
      if(!dataUser || dataUser.length==0 && !other ){
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

  async update(id: string, updateUserDto: UpdateUserDto) {
    try{
      const object=await this.filterUpdateData.filterData(updateUserDto);
      
      const dataUser=await this.userRepository.update(id,object);
      if(!dataUser){
        throw new manageError({
          type:"BAD_REQUEST",
          message:"IT CANNOT UPDATE THIS USER"
        });
      }
      return dataUser;
    }catch(err:any){
      throw manageError.signedErrors(err.message);
    }
  }

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
