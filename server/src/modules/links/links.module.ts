import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { Link } from './entities/link.entity';
import { LinksController } from './links.controller';
import { LinksService } from './links.service';
import { Category } from '../category/entities/category.entity';
import { CategoryService } from '../category/category.service';
@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([Link, Category])
  ],
  controllers: [LinksController],
  providers: [LinksService, CategoryService]
})
export class LinksModule {}
