import { DeleteResult } from 'typeorm';
import Leitura from '../infra/typeorm/entities/Leitura';
import ICreateLeituraDTO from '../dtos/ICreateLeituraDTO';

export default interface ILeiturasRepository {
  findAll(): Promise<Leitura[]>;
  findById(leitura_id: number): Promise<Leitura | undefined>;
  findAllByTag(tag_id: string): Promise<Leitura[]>;
  findAllByUsuario(usuario_id: number): Promise<Leitura[]>;
  delete(leitura_id: number): Promise<DeleteResult>;
  create(data: ICreateLeituraDTO): Promise<Leitura>;
  save(leitura: Leitura): Promise<Leitura>;
}
