import { DeleteResult } from 'typeorm';
import Local from '../infra/typeorm/entities/Local';
import ICreateLocalDTO from '../dtos/ICreateLocalDTO';

export default interface ILocaisRepository {
  findAll(): Promise<Local[]>;
  findById(notificacao_id: number): Promise<Local | undefined>;
  findAllByTag(tag_id: string): Promise<Local[]>;
  delete(notificacao_id: number): Promise<DeleteResult>;
  create(data: ICreateLocalDTO): Promise<Local>;
  save(notificacao: Local): Promise<Local>;
}
