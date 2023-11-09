import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Base } from "../../../core/common/base.entity"

@Entity('banner')
export class Banner extends Base {
  @ApiProperty({ description: '自增 id' })
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @ApiProperty({ description: 'name' })
  @Column({ length: 100 })
  name: string;

  @ApiProperty({ description: 'url' })
  @Column({ length: 100 })
  url: string;

  @ApiProperty({ description: 'pic' })
  @Column({ length: 200 })
  pic: string;

  @ApiProperty({ description: 'intro' })
  @Column('mediumtext', { nullable: true })
  intro: string;

  @ApiProperty({ description: 'status' })
  @Column()
  status: boolean;
}
