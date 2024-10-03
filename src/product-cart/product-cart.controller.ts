import { createProductCartDto } from './dto/createProductCart.ts/creation.productCart';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ProductCartService } from './product-cart.service';
import { UpdateProductCartDto } from './dto/update-product-cart.dto';
import { jwtGuard } from 'src/auth/jwt/guard/jwt.guard';
import { Request } from 'express';

@Controller('product-cart')
export class ProductCartController {
  constructor(private readonly productCartService: ProductCartService) {}

  @Post()
  @UseGuards(jwtGuard)
  create(@Body() createProductCartDto: createProductCartDto,@Req() request:Request) {
    const user=request["user"];
    return this.productCartService.create({
      ...createProductCartDto,
      ...user
    });
  }

  @Get()
  findAll() {
    return this.productCartService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productCartService.findOne(+id);
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
