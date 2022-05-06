import Leitura from '@modules/leituras/infra/typeorm/entities/Leitura';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('tags')
class Tag {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ unique: true })
  cod_tag: string;

  @OneToMany((type) => Leitura, (tag) => Tag, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  leituras?: Leitura[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Tag;
