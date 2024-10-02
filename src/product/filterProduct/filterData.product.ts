import { Injectable } from "@nestjs/common";
import { Repository, SelectQueryBuilder } from "typeorm";
import { Product } from "../entities/product.entity";
import { querysProduct } from "src/common/interface/querysProduct";
import { operatorsSql } from "src/common/interface/operator";


enum sort{
    asc="ASC",
    desc="DESC",
    ASC="ASC",
    DESC="DESC",
}

@Injectable()
export class FilterProductService{
  

    async returnResults(querys:any,repoProduct:Repository<Product>){
        const queryBuilder=repoProduct.createQueryBuilder("products");
        return await this.filterData(querys,queryBuilder);
        
    }


    private async filterData(querys:querysProduct,builder:SelectQueryBuilder<Product>){   
        let elements=[];     
        const limit = querys.limit ? querys.limit : null;
        const skip = querys.page ? querys.page : null;
        const order= querys.order ? querys.order : null;
        const sortElection= sort[querys.sort]; // take some value of the enum 

        for(let x of Object.keys(querys)){  
            if(querys[x] !== undefined && /^stock_(gt|gte|lt|lte)$/.test(x)){                                                   
                elements=this.operators(x);                     
                builder.innerJoin(`products.${elements[1]}`,elements[1])    
                builder.innerJoinAndMapMany
                builder.innerJoinAndMapOne
                builder.innerJoinAndSelect                          
                builder.andWhere(`stock.quantity ${elements[0]} ${parseInt(querys[x])}`);
            }
            else if(querys[x] !== undefined && /^price_(gt|gte|lt|lte)$/.test(x)){
                elements=this.operators(x);
                builder.andWhere(`products.price ${elements[1]} ${parseInt(querys[x])}`);
            }
        }

        querys.name != undefined ? builder.andWhere("products.name =:name",{name:querys.name}) : "";
      
        if(limit && skip){
            builder.skip((skip-1) * limit );
            builder.take(limit);
        } 
        if(limit) builder.take(limit);

        if(sortElection && order) builder.orderBy(`products.${order}`,sortElection);
 
        return await builder.getMany(); // take all register filters
    }

    private operators(query:any){
        const coinditentials= query !== undefined ? query.match(/_(gt|gte|lt|lte)$/) : null;      
        if(coinditentials !== null){
            const operator = operatorsSql[coinditentials[0]];
            const propertir= coinditentials.input.split("_")[0];
            return [operator,propertir];
        }
    }
}