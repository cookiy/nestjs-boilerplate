import { User } from '../../src/core/user/entities/user.entity';
import { ConnectionOptions } from 'typeorm/connection/ConnectionOptions';

const ormConfig: ConnectionOptions = {
  type: 'mysql',
  database: 'infra_db',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'Admin@123456',
  entities: [User],
};

export default ormConfig;
