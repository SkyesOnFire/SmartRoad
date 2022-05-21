import { DeleteResult } from 'typeorm';
import Notificacao from '../infra/typeorm/entities/Notificacao';
import ICreateNotificacaoDTO from '../dtos/ICreateNotificacaoDTO';

export default interface INotificacoesRepository {
  findAll(): Promise<Notificacao[]>;
  findById(notificacao_id: number): Promise<Notificacao | undefined>;
  findAllByTag(tag_id: string): Promise<Notificacao[]>;
  delete(notificacao_id: number): Promise<DeleteResult>;
  create(data: ICreateNotificacaoDTO): Promise<Notificacao>;
  save(notificacao: Notificacao): Promise<Notificacao>;
}
