import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AboutService } from './about.service';
import { CreateAboutDto } from './dto/create-about.dto';
import { UpdateAboutDto } from './dto/update-about.dto';
import { FindAboutDto } from './dto/find-about.dto';
import { About } from './entities/about.entity';
import { SkipJwtAuth } from '../../core/auth/constants'

@ApiTags('关于我们')
@ApiBearerAuth()
@Controller('about')
export class AboutController {
  constructor(private readonly aboutService: AboutService) {}

  @ApiBody({ type: CreateAboutDto })
  @ApiOperation({ summary: '增加' })
  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  create(@Body() createAboutDto: CreateAboutDto) {
    return this.aboutService.create(createAboutDto);
  }

	@SkipJwtAuth()
  @ApiResponse({ type: [About] })
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  @ApiOperation({ summary: '列表' })
  findAll(@Query() query: FindAboutDto) {
    return this.aboutService.findAll(query);
  }

  @ApiResponse({ type: About })
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.aboutService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAboutDto: UpdateAboutDto) {
    return this.aboutService.update(+id, updateAboutDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.aboutService.remove(id);
  }

	@SkipJwtAuth()
  @Get('list/count')
  @ApiOperation({ summary: '用户数量' })
  async getCount() {
    return await this.aboutService.getCount();
  }
}
