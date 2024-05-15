import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, ValidationPipe, Query } from '@nestjs/common';
import { StaysService } from './stays.service';
import { CreateStayDto } from './dto/create-stay.dto';
import { UpdateStayDto } from './dto/update-stay.dto';

@Controller('stays')
export class StaysController {
  constructor(private readonly staysService: StaysService) {}

  @Post()
  create(@Body(ValidationPipe) createStayDto: CreateStayDto) {
    return this.staysService.create(createStayDto);
  }

  @Get()
  findAll(@Query("type") type?: string, @Query("keyword") keyword?: string) {
    return this.staysService.findAll(type, keyword);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.staysService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body(ValidationPipe) updateStayDto: UpdateStayDto) {
    return this.staysService.update(id, updateStayDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.staysService.remove(id);
  }
}
