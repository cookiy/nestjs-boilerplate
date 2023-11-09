import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LinksService } from './links.service';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';
import { FindLinkDto } from './dto/find-link.dto';
import { SkipJwtAuth } from '../../core/auth/constants';
@ApiTags('links')
@SkipJwtAuth()
@Controller('links')
export class LinksController {
  constructor(private readonly linksService: LinksService) {}

  @Post()
  @ApiOperation({ summary: '增加' })
  create(@Body() createLinkDto: CreateLinkDto) {
    return this.linksService.create(createLinkDto);
  }

  @Get()
  @ApiOperation({ summary: '列表' })
  findAll(@Query() query: FindLinkDto) {
    return this.linksService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: '根据 id 查找' })
  findOne(@Param('id') id: string) {
    return this.linksService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '更新' })
  update(@Param('id') id: string, @Body() updateLinkDto: UpdateLinkDto) {
    return this.linksService.update(+id, updateLinkDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.linksService.remove(+id);
  }
}
