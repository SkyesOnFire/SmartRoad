import { DeleteResult, getRepository, Repository } from 'typeorm';

import INotificacoesRepository from '@modules/notificacoes/repositories/INotificacoesRepository';
import ICreateNotificacaoDTO from '@modules/notificacoes/dtos/ICreateNotificacaoDTO';

import Notificacao from '../entities/Notificacao';

class NotificacoesRepository implements INotificacoesRepository {
  private ormRepository: Repository<Notificacao>;

  constructor() {
    this.ormRepository = getRepository(Notificacao);
  }

  public async delete(notificacao_id: number): Promise<DeleteResult> {
    const notificacao = await this.ormRepository.delete(notificacao_id);

    return notificacao;
  }

  public async findAll(): Promise<Notificacao[]> {
    const notificacao = await this.ormRepository.find({ order: { id: 'ASC' } });

    return notificacao;
  }

  public async findAllByTag(tag_id: string): Promise<Notificacao[]> {
    const notificacoes = await this.ormRepository.find({
      where: {
        tag: tag_id,
      },
    });

    return notificacoes;
  }

  public async findById(notificacao_id: number): Promise<Notificacao | undefined> {
    const notificacao = await this.ormRepository.findOne(notificacao_id);

    return notificacao;
  }

  public async create(notificacaoData: ICreateNotificacaoDTO): Promise<Notificacao> {
    const notificacao = await this.ormRepository.create(notificacaoData);

    await this.ormRepository.save(notificacao);

    return notificacao;
  }

  public async save(notificacao: Notificacao): Promise<Notificacao> {
    return this.ormRepository.save(notificacao);
  }
}

export default NotificacoesRepository;
