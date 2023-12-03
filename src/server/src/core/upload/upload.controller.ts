import {
  BadRequestException,
  Controller,
  Get,
  Post,
  Res,
  Query,
  ParseIntPipe,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { staticBaseUrl } from './constants';
import { SkipJwtAuth } from '../../core/auth/constants';
@ApiTags('文件上传')
// @ApiBearerAuth()
@SkipJwtAuth()
@Controller('upload')
export class UploadController {
  @UseInterceptors(
    FileInterceptor('file', {
      dest: 'uploads',
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
     return {
       file: staticBaseUrl + file.originalname,
     };
  }

  @Post('files')
  @UseInterceptors(FileInterceptor('files'))
  uploadFiles(@UploadedFiles() files: Array<Express.Multer.File>) {
    return {
      files: files.map((f) => staticBaseUrl + f.originalname),
    };
  }
}
