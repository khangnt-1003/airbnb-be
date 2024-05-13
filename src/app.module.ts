import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StaysModule } from './stays/stays.module';
import { ConfigModule } from '@nestjs/config';
import { MongodbModule } from './mongodb/mongodb.module';
import { MongodbService } from './mongodb/mongodb.service';

@Module({
  imports: [StaysModule, ConfigModule.forRoot(), MongodbModule],
  controllers: [AppController],
  providers: [AppService, MongodbService],
})
export class AppModule {
  constructor(private readonly databaseService: MongodbService) {}

  async onModuleInit() {
    console.log(`Connected to database: ${this.databaseService.getDatabaseName()}`);
  }
}
