import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import loadConfig from '../config/configurations';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from '../core/user/user.module';
import { AuthModule } from '../core/auth/auth.module';
import { UploadModule } from '../core/upload/upload.module';
import { StaticModule } from '../core/static/static.module';
import { QuoteModule } from '../modules/quote/quote.module';
import { BannerModule } from '../modules/banner/banner.module';
import { AboutModule } from '../modules/about/about.module';
import { CategoryModule } from '../modules/category/category.module';
import { LinksModule } from '../modules/links/links.module';

const DOCKER_ENV = process.env.DOCKER_ENV;

const businessModules = [
  AuthModule,
  UserModule,
  UploadModule,
  StaticModule,
  QuoteModule,
  AboutModule,
  BannerModule,
  CategoryModule,
  LinksModule,
];
const libModules = [
  ConfigModule.forRoot({
    load: [loadConfig],
    envFilePath: [DOCKER_ENV ? '.docker.env' : '.env'],
  }),
  ScheduleModule.forRoot(),
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => {
      const { host, port, username, password, database } =
        configService.get('db');

      return {
        type: 'mysql',
        // .env 获取
        host,
        port,
        username,
        password,
        database,
        entities: [
          __dirname + "/entity/*.ts"
        ],
        synchronize: true,
        autoLoadEntities: true,
        logging: true,
        poolSize: 20,
        connectorPackage: 'mysql2',
      };
    },
  }),
];
@Module({
  imports: [...libModules, ...businessModules],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
