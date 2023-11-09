# 后端

使用 Nest.js 实现的admin API。

# 服务端技术栈

nodejs
nestjs
mysql
jwt
## 重要命令

### Nest.js 相关

本地启动：

```shell
npm run start:dev
```

### Docker 相关

构建 Docker 镜像：

```shell
docker build .
```

### 数据库相关

数据库迁移（初始化结构）：

```shell
npm run migration:run
```

生成数据库迁移文件：

```shell
npm run migration:create 操作名
```

插入初始数据：

```shell
npm run db:seed
```

重置数据：

```shell
npm run db:reset
```
🚧功能介绍

- 站点信息
- 管理员登模块
- 无限极栏目分类
- 文章模块
- 标签管理
- 广告模块
- 友情链接模块

🍅️案例

👈待开发功能表

- [] auth login
- [] user  
- [] category
- [] tag
- [] banner
- [] ad
- [] link