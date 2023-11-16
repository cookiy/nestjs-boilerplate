import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Base } from "../../../core/common/base.entity"
import { Link } from '../../links/entities/link.entity';

export const getInitCategory = () => {
  const cate1 = new Category();

  return [cate1];
};
@Entity('category')
export class Category extends Base {
  @ApiProperty({ description: '自增 id' })
  @PrimaryGeneratedColumn()
  id: number;


  @ApiProperty({ description: 'title' })
  @Column({ length: 80 })
  name: string;

  @ApiProperty({ description: 'status' })
  @Column({ default: false})
  isDelete: boolean;

  @ManyToOne(() => Category, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'parent_id' })
  parent: Category;

  @OneToMany(() => Category, category => category.parent)
  children: Category[];

  @OneToMany(() => Link, links => links.category)
  links: Link[];
}
