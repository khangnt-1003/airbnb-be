import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StaysModule } from './stays/stays.module';
import { ConfigModule } from '@nestjs/config';
import { MongodbModule } from './mongodb/mongodb.module';
import { MongodbService } from './mongodb/mongodb.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [StaysModule, ConfigModule.forRoot(), MongodbModule, UserModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, MongodbService],
})
export class AppModule {
  constructor(private readonly databaseService: MongodbService) {}

  async onModuleInit() {
    console.log(`Connected to database: ${this.databaseService.getDatabaseName()}`);
  }
}
