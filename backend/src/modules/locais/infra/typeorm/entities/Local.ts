import Leitura from '@modules/leituras/infra/typeorm/entities/Leitura';
import Usuario from '@modules/usuarios/infra/typeorm/entities/Usuario';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';

@Entity('locais')
class Local {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  nome: string;

  @Column()
  endereco_completo: string;

  @Column()
  cidade: string;

  @Column()
  estado: string;

  @Column({ type: 'float' })
  latitude: number;

  @Column({ type: 'float' })
  longitude: number;

  @OneToMany((type) => Leitura, (local) => Local, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  leituras?: Leitura[];

  @ManyToOne((type) => Usuario, (locais) => Local, {
    onDelete: 'CASCADE',
    lazy: true,
  })
  usuario: Promise<Usuario>;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Local;
