import { Injectable } from "@nestjs/common";
import { UpdateUserDto } from "../dto/update-user.dto";
import { RoleService } from "src/role/role.service";
import * as encrypt from 'bcrypt';

@Injectable()
export class filterDataUpdate{
    constructor(private roleService:RoleService){}

    async filterData(updateData:UpdateUserDto){
        let objectOk={};
        if(updateData.role){
            const role =await this.roleService.findOne(updateData.role);
            objectOk["roleId"]=role.id;
        }
        if(updateData.password){
            const hassPassword=await encrypt.hash(updateData.password,10);
            objectOk["password"]=hassPassword;
        }
        updateData.email ? objectOk["email"]=updateData.email : null;
        updateData.name ? objectOk["name"]=updateData.name : null;
        return objectOk;
    }
}