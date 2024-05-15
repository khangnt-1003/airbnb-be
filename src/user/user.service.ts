import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/user.schema';
import mongoose, { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async create(createUserDto: CreateUserDto) {
    const createdUser = await this.userModel.create({
      username: createUserDto.username,
      password:  createUserDto.password
    });
    if (!createdUser) throw new BadRequestException("Create failed");
    return createdUser;
  }

  async findByUsername(username: string) {
    const foundUser = await this.userModel.find({
      username
    });
    return foundUser[0];
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(id: string) {
    const foundUser = await this.userModel.findById(new mongoose.Types.ObjectId(id)).lean();
    if (!foundUser) throw new NotFoundException("User not found");
    return foundUser;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const updatedUser = await this.userModel.findByIdAndUpdate(new mongoose.Types.ObjectId(id), updateUserDto);
    if (!updatedUser) throw new BadRequestException("Update failed");
    return updatedUser;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
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
