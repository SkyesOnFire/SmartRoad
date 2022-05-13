import Tag from '@modules/tags/infra/typeorm/entities/Tag';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity('notificacoes')
class Notificacao {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  dt_ocorrencia: Date;

  @Column()
  name: String;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Notificacao;
