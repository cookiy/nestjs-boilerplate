import 'reflect-metadata';
import { createConnection, Repository } from 'typeorm';
import * as lodash from 'lodash';
import { getInitUsers } from './random';
import { User } from '../../src/core/user/entities/user.entity';
import ormConfig from './config';

const checkExist = async (userRepository: Repository<User>) => {
  console.log('检查是否已初始化...');

  const userNum = await userRepository.count();
  const exist = userNum > 0;

  if (exist) {
    console.log(`已存在 ${userNum} 条用户数据，不再初始化。`);
    return true;
  }

  return false;
};

const seed = async () => {
  console.log('开始插入数据...');
  const connection = await createConnection(ormConfig);

  const userRepository = connection.getRepository<User>(User);


  const userDataExist = await checkExist(userRepository);

  if (userDataExist) {
    return;
  }

  const initUsers = getInitUsers();

  console.log('生成初始化数据...');


  const allUsers = [...initUsers];

  console.log('插入初始化数据...');
  await userRepository.save(allUsers);

  console.log('数据初始化成功！');
};

seed()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
