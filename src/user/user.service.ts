import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { FilterUserService } from './filterUser/filter.userService';
import { query } from 'express';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository:Repository<User>,
    private filterData:FilterUserService
  ){}

  async create(createUserDto: CreateUserDto) {
    //const verifyUser=;
    const createUser=this.userRepository.create(createUserDto);
    await this.userRepository.save(createUser);
  }

  async findAll(querys:any) {
    const data=await this.filterData.returnResults(querys,this.userRepository);
  }

  async findOne(id: string) {
    const dataUser=await this.userRepository.findOne({where:{id:id}});
    return dataUser;
  }

  async findByEmail(email:string){
    const dataUser=await this.userRepository.findBy({email});
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const dataUser=await this.userRepository.update(id,updateUserDto);
    return dataUser;
  }

  async remove(id: string) {
    const deleteUser=await this.userRepository.delete(id);
  }
}
