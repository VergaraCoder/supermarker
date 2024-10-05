import { createProductCartDto } from './dto/createProductCart.ts/creation.productCart';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ProductCartService } from './product-cart.service';
import { UpdateProductCartDto } from './dto/update-product-cart.dto';
import { jwtGuard } from 'src/auth/jwt/guard/jwt.guard';
import { Request } from 'express';
import { roles } from 'src/common/decorators/role.decorator';
import { ProductCartDto } from './dto/create-product-cart.dto';
import { RoleGuard } from 'src/common/decorators/guard/role.guard';
import { Auth } from 'src/common/decorators/custom/auth.decorator';

@Controller('product-cart')
export class ProductCartController {
  constructor(private readonly productCartService: ProductCartService) {}

  @Post()
  @UseGuards(jwtGuard)
  create(@Body() createProductCartDto: ProductCartDto[],@Req() request:Request) {
    const user=request["user"];
      
      return this.productCartService.create(
        createProductCartDto,
        {...user});
  }

  @Get()
  @Auth("client","admin")
  findAll(@Req() request:any) {
    const dataUser=request["user"];    
    return this.productCartService.findAll(dataUser.cartId);
  }

  @Get(':productId')
  @Auth("admin","client")
  @UseGuards(jwtGuard,RoleGuard)
  findOne(@Param('productId') prodcutId: string,@Req() request:any) {
    const cartId=request["user"].cartId;
    return this.productCartService.findOne(+prodcutId,cartId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductCartDto: UpdateProductCartDto) {
    return this.productCartService.update(+id, updateProductCartDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productCartService.remove(+id);
  }
}
