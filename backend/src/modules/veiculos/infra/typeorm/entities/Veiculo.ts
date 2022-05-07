import Tag from '@modules/tags/infra/typeorm/entities/Tag';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity('veiculos')
class Veiculo {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ unique: true })
  placa: string;

  @Column({ unique: true, nullable: true })
  renavam?: string;

  @Column()
  cor: string;

  @Column()
  marca: string;

  @Column()
  modelo: string;

  @OneToOne((type) => Tag, (veiculo) => Veiculo, {
    onDelete: 'SET NULL',
    lazy: true,
    nullable: true,
  })
  @JoinColumn()
  tag?: Tag;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Veiculo;
