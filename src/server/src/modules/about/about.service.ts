import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, Raw, In } from 'typeorm';
import { CreateAboutDto } from './dto/create-about.dto';
import { UpdateAboutDto } from './dto/update-about.dto';
import { About } from './entities/about.entity';

@Injectable()
export class AboutService {
  constructor(
    @InjectRepository(About)
    private aboutRepository: Repository<About>,
  ) {}

  async create(createAboutDto: CreateAboutDto) {
    const { createdAt } = createAboutDto;
    createAboutDto.createdAt = createdAt || new Date();
    createAboutDto.updatedAt = new Date();

    delete createAboutDto.id;

    return await this.aboutRepository.save(createAboutDto);
  }

  async findAll(query: any) {
    const { keyword, category, page = 1, limit = 10 } = query;
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

    if (category) {
      whereParams = Object.assign(whereParams, {
        category: In(category),
      });
    }
    params = Object.assign(
      params,
      {
        where: whereParams,
      },
      {
        order: {
          updatedAt: 'DESC',
        },
      },
    );

    const [data, total] = await this.aboutRepository.findAndCount(params);

    return {
      total,
      data,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} about`;
  }

  update(id: number, updateAboutDto: UpdateAboutDto) {
    return `This action updates a #${id} about`;
  }

  async remove(id: string) {
    return this.aboutRepository.delete(id);
  }

  async getCount() {
    return await this.aboutRepository.count();
  }
}
