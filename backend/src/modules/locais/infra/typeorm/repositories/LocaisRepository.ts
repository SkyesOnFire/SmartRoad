import { DeleteResult, getRepository, Repository } from 'typeorm';

import ILocaisRepository from '@modules/locais/repositories/ILocaisRepository';
import ICreateLocalDTO from '@modules/locais/dtos/ICreateLocalDTO';

import Local from '../entities/Local';

class LocaisRepository implements ILocaisRepository {
  private ormRepository: Repository<Local>;

  constructor() {
    this.ormRepository = getRepository(Local);
  }

  public async delete(notificacao_id: number): Promise<DeleteResult> {
    const notificacao = await this.ormRepository.delete(notificacao_id);

    return notificacao;
  }

  public async findAll(): Promise<Local[]> {
    const notificacao = await this.ormRepository.find({ order: { id: 'ASC' } });

    return notificacao;
  }

  public async findAllByTag(tag_id: string): Promise<Local[]> {
    const locais = await this.ormRepository.find({
      where: {
        tag: tag_id,
      },
    });

    return locais;
  }

  public async findById(notificacao_id: number): Promise<Local | undefined> {
    const notificacao = await this.ormRepository.findOne(notificacao_id);

    return notificacao;
  }

  public async create(notificacaoData: ICreateLocalDTO): Promise<Local> {
    const notificacao = await this.ormRepository.create(notificacaoData);

    await this.ormRepository.save(notificacao);

    return notificacao;
  }

  public async save(notificacao: Local): Promise<Local> {
    return this.ormRepository.save(notificacao);
  }
}

export default LocaisRepository;
