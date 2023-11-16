const baseRoles = [
  {
    id: 1,
    name: 'dashboard',
    discriptiong: 'dashboard',
    reminder: '您没有权限访问首页',
  },
  {
    id: 2,
    name: 'category',
    discriptiong: 'category',
    reminder: '您没有权限访问首页',
  },
  {
    id: 3,
    name: 'link',
    discriptiong: 'link',
    reminder: '您没有权限访问首页',
  }
];

const adminRoles = [
  {
    id: 10,
    name: 'admin',
    discriptiong: 'admin',
    reminder: '您没有权限访问首页',
  },
];

export const basePermissions = [...baseRoles];
export const adminPermissions = [...baseRoles, ...adminRoles];
