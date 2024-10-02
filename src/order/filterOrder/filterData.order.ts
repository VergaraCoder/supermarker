import { Injectable } from "@nestjs/common";
import { Repository, SelectQueryBuilder } from "typeorm";
import { Order } from "../entities/order.entity";


@Injectable()
export class FilterOrderService{
    async returnResult(repoOrder:Repository<Order>){
        const builder=repoOrder.createQueryBuilder("orders");
        return await this.filterData(builder);
    }

    async filterData(builder:SelectQueryBuilder<Order>){
        builder.innerJoinAndSelect("orders.orderProduct","orderProducts");
        return await builder.getOne();
    }
}