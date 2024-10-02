import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { jwtGuard } from 'src/auth/jwt/guard/jwt.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @UseGuards(jwtGuard)
  async findAll(
    @Query("name") name :string, 
    @Query("role") role:string, 
    @Query("page") page:number, 
    @Query("limit") limit:number,
    @Query("sort") sort:string, 
    @Query("order") order:string
  ) {  
    return await  this.userService.findAll({
      name:name,
      role:role,
      page:page,
      limit:limit,
      sort:sort,
      order:order
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
   // return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
