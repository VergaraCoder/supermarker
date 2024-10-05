import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { jwtGuard } from 'src/auth/jwt/guard/jwt.guard';
import { roles } from 'src/common/decorators/role.decorator';
import { RoleGuard } from 'src/common/decorators/guard/role.guard';
import { Auth } from 'src/common/decorators/custom/auth.decorator';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @Auth("admin")
  async create(@Body() createProductDto: CreateProductDto) {
    return await this.productService.create(createProductDto);
  }

  @Get()
  @Auth("admin")
  findAll(
    @Query("name") name: string,
    @Query("price") price:number,
    @Query("price_gt") price_gt:number,
    @Query("price_gte") price_gte:number,
    @Query("price_lt") price_lt:number,
    @Query("price_lte") price_lte:number,
    @Query("page") page:number,
    @Query("limit") limit :number,
    @Query("sort") sort:string,
    @Query("order") order:string,
    @Query("stock") stock:number,
    @Query("stock_gt") stock_gt:number,
    @Query("stock_gte") stock_gte:number,
    @Query("stock_lt") stock_lt:number,
    @Query("stock_lte") stock_lte:number
  ) {
    return this.productService.findAll({
      name:name,
      price:price,
      price_gt:price_gt,
      price_gte:price_gte,
      price_lt:price_lt,
      price_lte:price_lte,
      page:page,
      limit:limit,
      sort:sort,
      order:order,
      stock:stock,
      stock_gt:stock_gt,
      stock_gte:stock_gte,
      stock_lt:stock_lt,
      stock_lte:stock_lte
  
    });
  }

  @Get(':id')
  @Auth("admin","client")
  findOne(@Param('id') id: string) {
   // return this.productService.findOne(id);
  }

  @Patch(':id')
  @Auth("admin")
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  @Auth("admin")
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
