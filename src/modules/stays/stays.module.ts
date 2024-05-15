import { Module } from '@nestjs/common';
import { StaysService } from './stays.service';
import { StaysController } from './stays.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Stay, StaySchema } from 'src/schemas/stay.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: Stay.name, schema: StaySchema}])],
  controllers: [StaysController],
  providers: [StaysService],
})
export class StaysModule {}
