import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';

import { Exclude } from 'class-transformer';

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

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Usuario;
