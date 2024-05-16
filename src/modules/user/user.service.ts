import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/user.schema';
import mongoose, { Model } from 'mongoose';
import { BaseService } from 'src/bases/services.base';

@Injectable()
export class UserService extends BaseService<User, CreateUserDto, UpdateUserDto> {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {
    super(userModel);
  }

  async findByUsername(username: string) {
    const foundUser = await this.userModel.find({
      username
    });
    return foundUser[0];
  }

  async removeRefreshToken (id: string) {
    return await this.userModel.updateOne({
      _id: new mongoose.Types.ObjectId(id),
      refreshToken: {
        $ne: null
      }
    }, {refreshToken: null});
  }
}
