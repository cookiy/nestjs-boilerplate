import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Base } from "../../../core/common/base.entity"
@Entity('about')
export class About extends Base {
  @ApiProperty({ description: '自增 id' })
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @ApiProperty({ description: 'name' })
  @Column()
  name: string;

  @ApiProperty({ description: 'route' })
  @Column()
  route: string;

  @ApiProperty({ description: 'description' })
  @Column()
  description: string;

  @ApiProperty({ description: 'category' })
  @Column()
  category: string;

  @ApiProperty({ description: 'banner' })
  @Column()
  banner: string;

  @ApiProperty({ description: 'content' })
  @Column('mediumtext', { nullable: true })
  content: string;

  @ApiProperty({ description: 'status' })
  @Column()
  status: boolean;
}
