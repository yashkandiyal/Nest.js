import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  /* we will handle the following routes
    DELETE /users/:id
    */
  @Get() // GET /users
  findAll(@Query('role') role?: 'admin' | 'intern' | 'engineer') {
    return this.usersService.findAll(role);
  }
  @Get(':id') // GET /users/:id
  //id in params is in the format of a string but in the database it is in the form of a number so we have to change the string here to number.
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }
  @Post() // POST /users
  create(@Body(ValidationPipe) user: CreateUserDto) {
    return this.usersService.create(user);
  }
  @Patch(':id') // PATCH /users/:id
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe)
    userUpdate: UpdateUserDto,
  ) {
    return this.usersService.update(id, userUpdate);
  }
  @Delete(':id') // DELETE /users/:id
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.delete(id);
  }
}
