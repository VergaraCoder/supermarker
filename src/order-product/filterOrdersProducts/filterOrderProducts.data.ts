import { Injectable } from "@nestjs/common";
import { Repository, SelectQueryBuilder } from "typeorm";
import { OrderProduct } from "../entities/order-product.entity";
import { manageError } from "src/common/erros/customError/maanage.error";


@Injectable()
export class FilterOrderProductsService{
    async returnResults(repoOrderProducts:Repository<OrderProduct>,operation:string,params?:number[]){
        const queryBuilder=repoOrderProducts.createQueryBuilder("orderProducts");
        switch(operation){
            case "delete":
                return await this.deleteOrdersProducts(queryBuilder,params)
            
            case "all":
                return await this.filterData(queryBuilder);
        }
    }

    private async filterData(builder:SelectQueryBuilder<OrderProduct>){

    }

    private async deleteOrdersProducts(builder:SelectQueryBuilder<OrderProduct>,idProducts:number[]){
       const productDelete= await builder.innerJoin("orderProducts.product","products")
        .where(`product.id IN (:...products)`,{products:idProducts})
        .getMany();
        
        try{
            if(productDelete.length > 0){
                await builder.delete().whereInIds(productDelete.map(product=>product.id)).execute();
                return "PerfectDelete";
            }else{
                throw new manageError({
                    type:"NOT_FOUND",
                    message:"THERE ARE DONT REGISTER FOR DELETE"
                });
            }  
        }catch(err:any){
            throw manageError.signedErrors(err.message);
        }
    }
}