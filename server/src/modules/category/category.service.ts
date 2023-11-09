import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, IsNull } from 'typeorm';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { RemoveCategoryDto } from './dto/remove-category.dto';
import { FindCategorytDto } from './dto/find-category.dto';
@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}
  async create(createCategoryDto: CreateCategoryDto) {
    const { name } = createCategoryDto;
    // 检查名称是否已存在
    const existCategory = await this.categoryRepository .findOneBy({
      name: name,
      isDelete: false,
    });
    if (existCategory) {
      throw new HttpException('Category name already exists.', HttpStatus.ACCEPTED);
    }
    const category = new Category();
    category.name= name;

    return this.categoryRepository.save(category);
  }

  async findAll(query: FindCategorytDto) {
    const { keyword, page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;

    let params = {
      skip,
      take: limit,
    };

    let whereParams = {};

    if (keyword) {
      whereParams = Object.assign(whereParams, {
        name: Like(`%${keyword}%`),
      });
    }

    whereParams = Object.assign(whereParams, {
      parent: IsNull(),
    });

    params = Object.assign(
      params,
      {
        where: whereParams,
      },
      {
        order: {
          updatedAt: 'DESC'
        },
      },
    );

    const [data, total] = await this.categoryRepository.findAndCount(params);

    return {
      total,
      data,
    };
  }

  async findOne(id: number) {
    const vo = await this.categoryRepository.findOneBy({
      id: id,
      isDelete: false,
    });
    return vo
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    updateCategoryDto.updatedAt = new Date();

    return await this.categoryRepository.update(id, updateCategoryDto);
  }

  async remove(id: number) {
    const update = new RemoveCategoryDto();
    update.deletedAt = new Date();
    update.isDelete = true;

    return await this.categoryRepository.update(id, update);
  }
}
