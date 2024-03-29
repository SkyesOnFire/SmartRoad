import Tag from '@modules/tags/infra/typeorm/entities/Tag';
import Usuario from '@modules/usuarios/infra/typeorm/entities/Usuario';
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
  nome: String;

  @ManyToOne((type) => Tag, (notificacoes) => Notificacao, {
    onDelete: 'CASCADE',
    lazy: true,
  })
  tag: Promise<Tag>;

  @ManyToOne((type) => Usuario, (notificacoes) => Notificacao, {
    onDelete: 'CASCADE',
    lazy: true,
  })
  usuario: Promise<Usuario>;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Notificacao;
