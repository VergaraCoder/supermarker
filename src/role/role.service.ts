import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';
import { manageError } from 'src/common/erros/customError/maanage.error';

@Injectable()
export class RoleService {
  constructor(@InjectRepository(Role) private roleRepository:Repository<Role>){}
  async create(createRoleDto: CreateRoleDto) {
    return 'This action adds a new role';
  }

  async findAll() {
    return `This action returns all role`;
  }

  async findOne(nameRole: string) {
    try{
      const data=await this.roleRepository.findOne({where:{nameRole:nameRole}});
      if(!data){
        throw new manageError({
          type:"NOT_FOUND",
          message:"THIS ROLE NOT EXIST"
        });
      }
      return data;
    }catch(err:any){  
      throw manageError.signedErrors(err.message);
    }
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  async remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
