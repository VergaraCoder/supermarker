import { Injectable } from "@nestjs/common";
import { Repository, SelectQueryBuilder } from "typeorm";
import { Product } from "../entities/product.entity";


@Injectable()
export class FilterProductService{
    async returnResults(querys:any,repoProduct:Repository<Product>){
        const queryBuilder=repoProduct.createQueryBuilder("products");
        
    }

    private filterData(querys:any,builder:SelectQueryBuilder<Product>){
        
    }
}