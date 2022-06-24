import Local from '@modules/locais/infra/typeorm/entities/Local';
import Tag from '@modules/tags/infra/typeorm/entities/Tag';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity('leituras')
class Leitura {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  dt_ocorrencia: Date;

  @ManyToOne((type) => Tag, (leituras) => Leitura, {
    onDelete: 'CASCADE',
    lazy: true,
  })
  tag: Promise<Tag>;

  @ManyToOne((type) => Local, (leituras) => Leitura, {
    onDelete: 'CASCADE',
    lazy: true,
  })
  local: Promise<Local>;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Leitura;
