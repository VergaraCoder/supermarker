import { Injectable } from "@nestjs/common";
import { Repository, SelectQueryBuilder } from "typeorm";
import { ProductCart } from "../entities/product-cart.entity";
import { manageError } from "src/common/erros/customError/maanage.error";


@Injectable()
export class FilterProductCartService{
    async returnResults(repoProductCart:Repository<ProductCart>,operationCrud:string,data:number,idResources?:number[]| string[],){
        const queryBuilder=repoProductCart.createQueryBuilder("ProductsCart");
        if(idResources.every(param=>typeof param=="number") && "delete"){
            return await this.deleteProducts(queryBuilder,idResources);
        }
        else{
            return await this.filterData(queryBuilder,data)
        }
    }

    private async filterData(builder:SelectQueryBuilder<ProductCart>,cartId:number){
        return await builder.innerJoin("ProductsCart.productId","products")
        .innerJoin("ProductCart.cartId","cart")
        .where("cart.id=:cartId",{cartId:cartId})
        .andWhere("ProductCart.cartId=:productOfUser",{productOfUser:cartId})
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
}