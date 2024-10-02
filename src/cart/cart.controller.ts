import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { jwtGuard } from 'src/auth/jwt/guard/jwt.guard';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  create(@Body() createCartDto: CreateCartDto) {
    return this.cartService.create(createCartDto);
  }
  
  @UseGuards(jwtGuard)
  @Get()
  findAll(
  ) {
    return this.cartService.findAll();
  }

  @UseGuards(jwtGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {    
    return this.cartService.findOne(+id);
  }

  @UseGuards(jwtGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartService.update(+id, updateCartDto);
  }

  @UseGuards(jwtGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartService.remove(+id);
  }
}
