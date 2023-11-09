import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber, IsString, IsUrl, MaxLength, ValidateNested } from 'class-validator';
import { UpdateLinkCategoryDto } from './update-link-category.dto';
import { Type } from 'class-transformer';
export class UpdateLinkDto {
  @ApiProperty({ description: 'url' })
  @IsNotEmpty()
  @IsUrl()
  url: string;

  @ApiProperty({ description: 'name' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(80)
  name: string;

  @ApiProperty({ description: 'title' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(150)
  title: string;

  @ApiProperty({ description: 'description' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(500)
  description: string;

  @ApiProperty({ description: 'icon' })
  @IsNotEmpty()
  @IsUrl()
  @MaxLength(500)
  icon: string;

  @ApiProperty({ description: 'weight' })
  @IsNumber()
  weight?: number;

  @ApiProperty({ description: 'Category' })
  @IsString()
  @IsNotEmpty()
  cateId: any;
}
