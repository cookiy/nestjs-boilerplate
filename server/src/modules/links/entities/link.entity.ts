import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from '../../category/entities/category.entity';
import { Base } from "../../../core/common/base.entity"

@Entity('link')
export class Link extends Base {
  @ApiProperty({ description: '自增 id' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'name' })
  @Column({ length: 80, default: ''})
  name: string;

  @ApiProperty({ description: 'title' })
  @Column({ length: 150, default: ''})
  title: string;

  @ApiProperty({ description: 'description' })
  @Column({ length: 500, default: '' })
  description: string;

  @Column()
  url: string;

  @Column({ length: 500, default: '' })
  icon: string;

  @Column({default: 0})
  @Index("link_weight_index")
  weight: number;

  @ApiProperty({ description: 'status' })
  @Column({ default: false})
  isDelete: boolean;

  @ManyToOne(() => Category, category => category.links, { eager: true })
  category: Category;
}