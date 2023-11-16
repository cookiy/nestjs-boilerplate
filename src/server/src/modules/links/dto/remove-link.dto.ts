import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate } from 'class-validator';

export class RemoveLinkDto {
  @ApiProperty()
  @IsBoolean()
  isDelete: boolean;

  @ApiProperty()
  @IsDate()
  deletedAt: Date;
}
