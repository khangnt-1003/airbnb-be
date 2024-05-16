import { BadRequestException, NotFoundException } from "@nestjs/common";
import mongoose, { Model } from "mongoose";
import { Stay } from "src/schemas/stay.schema";

export abstract class BaseService<T, Y, U> {
    constructor(private model: Model<T>) {};

    async create(createDto: Y) {
        const created = await this.model.create({...createDto});
        if (!created) throw new BadRequestException("Create failed");
        return created;
    }

    async findAll() {
        const found = await this.model.find({}).lean();
        return found;
    }

    async findOne(id: string) {
        const found = await this.model.findById(new mongoose.Types.ObjectId(id)).lean();
        if (!found) throw new NotFoundException("Not found");
        return found;
    }

    async update(id: string, updateDto: U) {
        const updatedUser = await this.model.findByIdAndUpdate(new mongoose.Types.ObjectId(id), updateDto);
        if (!updatedUser) throw new BadRequestException("Update failed");
        return updatedUser;
    }

    async remove(id: string) {
        const deleted = await this.model.findOneAndDelete({
            _id: new mongoose.Types.ObjectId(id),
        });
        return deleted;
    }
}