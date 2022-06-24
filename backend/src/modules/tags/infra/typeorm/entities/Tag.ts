import Leitura from '@modules/leituras/infra/typeorm/entities/Leitura';
import Usuario from '@modules/usuarios/infra/typeorm/entities/Usuario';
import Veiculo from '@modules/veiculos/infra/typeorm/entities/Veiculo';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
  ManyToOne,
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

  @OneToOne((type) => Veiculo, (tag) => Tag, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  veiculo?: Veiculo;

  @ManyToOne((type) => Usuario, (tags) => Tag, {
    onDelete: 'CASCADE',
    lazy: true,
  })
  usuario: Promise<Usuario>;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Tag;
