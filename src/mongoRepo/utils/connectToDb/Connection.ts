import { Db, MongoClient } from 'mongodb';

export default interface Connection {
  readonly client: MongoClient;
  readonly db: Db;
}
