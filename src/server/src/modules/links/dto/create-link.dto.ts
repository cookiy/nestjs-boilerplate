import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUrl, MaxLength } from 'class-validator';

export class CreateLinkDto {
  @ApiProperty({ description: 'url' })
  @IsNotEmpty()
  @IsUrl()
  url: string;

  @ApiProperty({ description: 'category id' })
  @IsString()
  cateId?: string
}
