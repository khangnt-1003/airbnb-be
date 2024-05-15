import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateStayDto } from './dto/create-stay.dto';
import { UpdateStayDto } from './dto/update-stay.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Stay } from 'src/schemas/stay.schema';
import mongoose, { Model } from 'mongoose';

@Injectable()
export class StaysService {
  constructor(@InjectModel(Stay.name) private stayModel: Model<Stay>) {};
  async create(createStayDto: CreateStayDto): Promise<Stay> {
    const createdStay = new this.stayModel(createStayDto);
    if (!createdStay) throw new BadRequestException("Create failed");
    return createdStay.save();
  }

  async findAll(type?: string, keywords?: string){
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

  async findOne(id: string) {
    const foundStay = await this.stayModel.findById(new mongoose.Types.ObjectId(id)).lean();
    if (!foundStay) throw new NotFoundException("Not found stays");
    return foundStay;
  }

  async update(id: string, updateStayDto: UpdateStayDto) {
    const updatedStay = await this.stayModel.findByIdAndUpdate(new mongoose.Types.ObjectId(id), updateStayDto, {
      new: true,
    });
    if (!updatedStay) throw new BadRequestException("Update failed");
    return updatedStay;
  }

  async remove(id: string) {
    const deletedStay = await this.stayModel.findOneAndDelete({
      _id: new mongoose.Types.ObjectId(id),
    });
    return deletedStay;
  }
}
