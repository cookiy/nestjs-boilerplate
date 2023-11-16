import { ApiProperty } from '@nestjs/swagger';
export class FindLinkDto {
  @ApiProperty({
    required: false,
  })
  keyword: string;

  @ApiProperty()
  page: number;

  @ApiProperty()
  limit: number;
}
