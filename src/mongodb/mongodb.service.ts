import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class MongodbService {
  constructor(@InjectConnection() private connection: Connection) {}

  getDatabaseName(): string {
    // console.log(this.connection.db.namespace);
    return this.connection.db.databaseName;
  }
}