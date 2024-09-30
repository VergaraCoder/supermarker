import { Injectable } from "@nestjs/common";
import { Repository, SelectQueryBuilder } from "typeorm";
import { User } from "../entities/user.entity";
import { querys } from "src/common/interface/querys";


@Injectable()
export class FilterUserService{
    async returnResults(querys:querys,repoUser:Repository<User>){
        const queryBuilder=repoUser.createQueryBuilder("users");
        const data= await this.filterData(querys,queryBuilder);
        return data;
    }

    private async filterData(querys:querys,queryBuilder:SelectQueryBuilder<User>){
        
        const limit=querys.limit ? querys.limit : null;
        const sort=querys.sort ? querys.sort : 'name';
        const order=querys.order== 'asc'? querys.order='ASC' : querys.order='DESC';
        const page=querys.page ? querys.page : null;

        querys.name != undefined ? queryBuilder.andWhere("users.name =:name",{name:querys.name}) : "";
        querys.role != undefined ? queryBuilder.innerJoinAndSelect("users.role","roles") : ""; 

        if(limit && page ){
            queryBuilder.skip((page-1)*limit);
            queryBuilder.take(limit);
        }
        limit != null ? queryBuilder.take(limit) : null; 
        sort !== null  && order !== null ? queryBuilder.orderBy(`users.${sort}`,order) : null
        !sort ? queryBuilder.orderBy(`ASC`) : null;

        return await queryBuilder.getMany();
    }
}