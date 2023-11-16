import { Injectable } from '@nestjs/common';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { Banner } from './entities/banner.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BannerService {
  constructor(
    @InjectRepository(Banner)
    private bannerRepository: Repository<Banner>,
  ) {}

  async create(createBannerDto: CreateBannerDto) {
    const { createdAt } = createBannerDto;
    createBannerDto.createdAt = createdAt || new Date();
    createBannerDto.updatedAt = new Date();

    delete createBannerDto.id;

    return await this.bannerRepository.save(createBannerDto);
  }

  findAll() {
    return `This action returns all banner`;
  }

  async findOneById(id: number) {
    return `This action find a #${id} banner`;
  }
  update(id: number, updateBannerDto: UpdateBannerDto) {
    return `This action updates a #${id} banner`;
  }

  remove(id: number) {
    return `This action removes a #${id} banner`;
  }
}
