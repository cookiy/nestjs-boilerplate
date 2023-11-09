import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BannerService } from './banner.service';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { Banner } from './entities/banner.entity';
import { SkipJwtAuth } from '../../core/auth/constants'

@ApiTags('Banner')
@ApiBearerAuth()
@Controller('banner')
export class BannerController {
  constructor(private readonly bannerService: BannerService) {}

  @ApiBody({ type: CreateBannerDto })
  @ApiOperation({ summary: '增加' })
  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  create(@Body() createBannerDto: CreateBannerDto) {
    return this.bannerService.create(createBannerDto);
  }

  @ApiResponse({ type: [Banner] })
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  @ApiOperation({ summary: '列表' })
  findAll() {
    return this.bannerService.findAll();
  }

  @ApiResponse({ type: Banner})
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  @ApiOperation({ summary: '根据 id 查找' })
  findOne(@Param('id') id: string) {
    return this.bannerService.findOneById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBannerDto: UpdateBannerDto) {
    return this.bannerService.update(+id, updateBannerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bannerService.remove(+id);
  }
}
