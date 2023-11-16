import { createConnection } from 'typeorm';
import ormConfig from './config';
import { User } from '../../src/core/user/entities/user.entity';

const reset = async () => {
  const connection = await createConnection(ormConfig);
  await connection.createQueryBuilder().delete().from(User).execute();
};

reset()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
