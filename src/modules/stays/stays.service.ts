import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateStayDto } from './dto/create-stay.dto';
import { UpdateStayDto } from './dto/update-stay.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Stay } from 'src/schemas/stay.schema';
import mongoose, { Model } from 'mongoose';
import { BaseService } from 'src/bases/services.base';

@Injectable()
export class StaysService extends BaseService<Stay, CreateStayDto, UpdateStayDto> {
  constructor(@InjectModel(Stay.name) private stayModel: Model<Stay>) {
    super(stayModel);
  };

  async findAll(type?: string, keywords?: string) {
    let stays;
    if (!type && !keywords) stays = await this.stayModel.find({}).lean();
    else if (!keywords) stays = await this.stayModel.find({
      types: type
    })
    else if (!type) stays = await this.stayModel.find({
      $text: {$search: keywords}
    })
    else stays = await this.stayModel.find({
      $text: {$search: keywords},
      types: type
    })
    if (!stays.length) throw new NotFoundException("Not found stays");
    return stays;
  }
}
