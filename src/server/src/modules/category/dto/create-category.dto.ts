import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ description: 'category name' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(80)
  name: string;
}
