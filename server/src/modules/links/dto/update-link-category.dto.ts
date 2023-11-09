import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateLinkCategoryDto {
  @ApiProperty({ description: 'category ID' })
  @IsNotEmpty()
  categoryId: String;
}