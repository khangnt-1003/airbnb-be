import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BaseService } from './services.base';

@Controller()
export abstract class BaseController<T, Y, U> {
  constructor(private readonly service: BaseService<T, Y, U>) {}

  @Post()
  create(@Body() createUserDto: Y) {
    return this.service.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: U) {
    return this.service.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
