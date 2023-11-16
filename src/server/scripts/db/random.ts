import { User } from '../../src/core/user/entities/user.entity';

export const getInitUsers = () => {
  const admin = new User();
  admin.email = 'admin@admin.com';
  admin.username = 'admin';
  admin.password = 'admin@byte_888';
  admin.is_admin = 1;

  const wangguanjia = new User();
  wangguanjia.email = '13716106744@163.com';
  wangguanjia.username = 'wangguanjia';
  wangguanjia.password = 'wangguanjia@byte_888';
  wangguanjia.is_admin = 1;

  return [admin, wangguanjia];
};