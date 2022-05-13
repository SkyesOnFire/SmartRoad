import Leitura from '@modules/leituras/infra/typeorm/entities/Leitura';
import Veiculo from '@modules/veiculos/infra/typeorm/entities/Veiculo';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
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

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Tag;
