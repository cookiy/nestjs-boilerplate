import {
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { staticBaseUrl } from './constants';
import { SkipJwtAuth } from '../../core/auth/constants';
@ApiTags('文件上传')
// @ApiBearerAuth()
@SkipJwtAuth()
@Controller('upload')
export class UploadController {
  @Post('file')
  @UseInterceptors(FileInterceptor('file'))
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
