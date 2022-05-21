import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('locais')
class Local {
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

export default Local;
