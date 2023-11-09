import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, Raw, In } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';
import { RemoveLinkDto } from './dto/remove-link.dto';
import { Link } from './entities/link.entity';
import { FindLinkDto } from './dto/find-link.dto';
import { CategoryService } from '../category/category.service';
@Injectable()
export class LinksService {
  constructor(
    private httpService: HttpService,
    @InjectRepository(Link)
    private linkRepository: Repository<Link>,
    private readonly categoryService: CategoryService,
  ) {}
  async create(createLinkDto: CreateLinkDto) {
    const { url, cateId } = createLinkDto;
    // 检查名称是否已存在
    const existCategory = await this.linkRepository .findOneBy({
      url: url,
      isDelete: false,
    });
    if (existCategory) {
      throw new HttpException('link already exists.', HttpStatus.ACCEPTED);
    }

    const category = await this.categoryService.findOne(+cateId);
    const { title, description, icon } = await this.fetchUrlInfo(url)
    const link = new Link()
    link.url = url
    link.title = title
    link.description = description
    link.icon = icon
    link.category = category
    return this.linkRepository.save(link);
  }
	async fetchUrlInfo(URL: string) {
		try {
			const res = await this.httpService.get(URL).toPromise()
      const html = res.data
      const cheerio = require('cheerio')
      var $=cheerio.load(html,{decodeEntities:false})
      const title= $ ("title").text ()
      const description = $('meta[name="description"]').attr('content');
      const faviconTag = $('link[rel="icon"]');
      const icon = faviconTag.attr('href') || '';
      return {
        title,
        description,
        icon
      }
		} catch (error) {
      console.log('error', error);
			return {
        title: '',
        describe: '',
        icon: ''
      }
		}
	}

  async findAll(query: FindLinkDto) {
    const { keyword, page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;

    let params = {
      skip,
      take: limit,
    };

    let whereParams = {
      isDelete: false
    };

    if (keyword) {
      whereParams = Object.assign(whereParams, {
        name: Like(`%${keyword}%`),
      });
    }

    params = Object.assign(
      params,
      {
        where: whereParams,
      },
      {
        order: {
          weight: 'DESC',
          updatedAt: 'DESC',
        },
      },
    );

    const [data, total] = await this.linkRepository.findAndCount(params);

    return {
      total,
      data,
    };
  }

  async findOne(id: number) {
    return await this.linkRepository.findOneBy({
      id: id,
      isDelete: false,
    });
  }

  async update(id: number, updateLinkDto: UpdateLinkDto) {
    const { title, name, description, url, icon, weight, cateId } = updateLinkDto;
    const category = await this.categoryService.findOne(+cateId);
    const updatedAt = new Date();
    return await this.linkRepository.update(id, {
      title,
      name,
      description,
      url,
      icon,
      weight,
      category,
      updatedAt
    });
  }

  async remove(id: number) {
    const update = new RemoveLinkDto();
    update.deletedAt = new Date();
    update.isDelete = true;

    return await this.linkRepository.update(id, update);
  }
}
