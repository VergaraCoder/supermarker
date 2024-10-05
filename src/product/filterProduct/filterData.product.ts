import { Injectable } from "@nestjs/common";
import { Repository, SelectQueryBuilder } from "typeorm";
import { Product } from "../entities/product.entity";
import { querysProduct } from "src/common/interface/querysProduct";
import { operatorsSql } from "src/common/interface/operator";


// enum sort{
//     asc="ASC",
//     desc="DESC",
//     ASC="ASC",
//     DESC="DESC",
// }

@Injectable()
export class FilterProductService{
  

    async returnResults(querys:any,repoProduct:Repository<Product>){
        const queryBuilder=repoProduct.createQueryBuilder("products");
        return await this.filterData(querys,queryBuilder);
    }


    private async filterData(querys:querysProduct,builder:SelectQueryBuilder<Product>){        
        if(Object.values(querys).every(properti=>properti==undefined)){
            return await builder.leftJoinAndSelect("products.stock","stock").getMany()
        } 
        let elements=[];     
        const limit = querys.limit ? querys.limit : null;
        const skip = querys.page ? querys.page : 1;
        const order= querys.order ? querys.order : null;
        const sort= querys.sort=="asc" ? "ASC" : "DESC";

        for(let x of Object.keys(querys)){  
            if(querys[x] !== undefined && /^stock_(gt|gte|lt|lte)$/.test(x)){                                                   
                elements=this.operators(x);                     
                builder.innerJoin(`products.${elements[1]}`,elements[1])                             
                builder.andWhere(`stock.quantity ${elements[0]} ${parseInt(querys[x])}`);
            }
            else if(querys[x] !== undefined && /^price_(gt|gte|lt|lte)$/.test(x)){
                elements=this.operators(x);
                builder.andWhere(`products.price ${elements[1]} ${parseInt(querys[x])}`);
            }
        }


        if(querys.name){
            builder.andWhere("products.name =:name",{name:querys.name})
        }
      
        if(limit){
            builder.skip((skip-1) * limit );
            builder.take(limit);
        } 

        if(order){    
             builder.orderBy(`products.${order}`,sort);
        }
        return await builder.getMany(); 
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