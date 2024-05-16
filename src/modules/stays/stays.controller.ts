import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, ValidationPipe, Query } from '@nestjs/common';
import { StaysService } from './stays.service';
import { CreateStayDto } from './dto/create-stay.dto';
import { UpdateStayDto } from './dto/update-stay.dto';
import { BaseController } from 'src/bases/controllers.base';
import { Stay } from 'src/schemas/stay.schema';

@Controller('stays')
export class StaysController extends BaseController<Stay, CreateStayDto, UpdateStayDto> {
  constructor(private readonly staysService: StaysService) {
    super(staysService);
  }

  @Get()
  findAll(@Query("type") type?: string, @Query("keyword") keyword?: string) {
    return this.staysService.findAll(type, keyword);
  }
}
