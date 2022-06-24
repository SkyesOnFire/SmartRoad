import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import { Exclude } from 'class-transformer';
import Local from '@modules/locais/infra/typeorm/entities/Local';
import Tag from '@modules/tags/infra/typeorm/entities/Tag';
import Veiculo from '@modules/veiculos/infra/typeorm/entities/Veiculo';

@Entity('usuarios')
class Usuario {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  nome: string;

  @Column({ unique: true })
  cpf: string;

  @Column({ nullable: true })
  email?: string;

  @Column()
  @Exclude()
  senha: string;

  // 0 - Inicial / 1 - Usuário / 2 - Administrador
  @Column({ default: 0 })
  cod_perfil: number;

  @Column({ default: 'Inicial' })
  des_perfil: string;

  @OneToMany((type) => Local, (usuario) => Usuario, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  locais?: Local[];

  @OneToMany((type) => Tag, (usuario) => Usuario, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  tags?: Tag[];

  @OneToMany((type) => Veiculo, (usuario) => Usuario, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  veiculos?: Veiculo[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Usuario;
