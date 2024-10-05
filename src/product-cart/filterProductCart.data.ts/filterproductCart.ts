import { Injectable } from "@nestjs/common";
import { Repository, SelectQueryBuilder } from "typeorm";
import { ProductCart } from "../entities/product-cart.entity";
import { manageError } from "src/common/erros/customError/maanage.error";


@Injectable()
export class FilterProductCartService{
    async returnResults(repoProductCart:Repository<ProductCart>,operationCrud:string,data:any,idResources?:number[]| string[],){


        const queryBuilder=repoProductCart.createQueryBuilder("ProductsCart");

        if(idResources && idResources.every(param=>typeof param=="number") && operationCrud=="delete"){
            return await this.deleteProducts(queryBuilder,idResources);
        }
        else if(operationCrud=="one"){
            return await this.filterOneData(queryBuilder,data);
        }
        else{
            return await this.filterData(queryBuilder,data)
        }
    }

    private async filterData(builder:SelectQueryBuilder<ProductCart>,cartId:number){
        console.log(cartId);
        
        return await builder.innerJoin("ProductsCart.product","products")
        .innerJoin("ProductsCart.cart","cart")
        .where("cart.id=:cartId",{cartId:cartId})
        //.andWhere("ProductsCart.cartId=:productOfUser",{productOfUser:cartId})
        .getMany();
    }

    private async deleteProducts(builder:SelectQueryBuilder<ProductCart>,idProducts:number[]){
        const productsDeleted=await builder.innerJoin("ProductsCart.productId","products")
        .where(`products.id =(:...products)`,{products:idProducts})
        .getMany();
        try{
            if(productsDeleted.length==0){
                throw new manageError({
                    type:"NOT_FOUND",
                    message:"THERE ARE DONT REGISTER FOR DELETE"
                });
            }
            return "Delete perfect"
        }catch(err:any){
            throw manageError.signedErrors(err.message);
        }
    }


    
    private async filterOneData(builder:SelectQueryBuilder<ProductCart>,dataQuery:any){        
        return await builder.innerJoin("ProductsCart.product","products")
        .innerJoin("ProductsCart.cart","cart")
        .where("cart.id=:cartId",{cartId:dataQuery.cartId})
        .andWhere("products.id=:product",{product:dataQuery.productId})
        .getMany();
    }

}