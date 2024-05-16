import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { BaseController } from 'src/bases/controllers.base';
import { User } from 'src/schemas/user.schema';

@Controller('users')
export class UserController extends BaseController<User, CreateUserDto, UpdateUserDto> {
  constructor(private readonly userService: UserService) {
    super(userService);
  }
}
