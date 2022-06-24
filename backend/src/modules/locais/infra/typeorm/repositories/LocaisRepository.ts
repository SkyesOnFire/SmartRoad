import { DeleteResult, getRepository, Repository } from 'typeorm';

import ILocaisRepository from '@modules/locais/repositories/ILocaisRepository';
import ICreateLocalDTO from '@modules/locais/dtos/ICreateLocalDTO';

import Local from '../entities/Local';

class LocaisRepository implements ILocaisRepository {
  private ormRepository: Repository<Local>;

  constructor() {
    this.ormRepository = getRepository(Local);
  }

  public async delete(local_id: number): Promise<DeleteResult> {
    const local = await this.ormRepository.delete(local_id);

    return local;
  }

  public async findAllByUsuario(usuario_id: number): Promise<Local[]> {
    const locais = await this.ormRepository.find({
      where: {
        usuario: usuario_id,
      },
    });

    return locais;
  }

  public async findAll(): Promise<Local[]> {
    const local = await this.ormRepository.find({ order: { id: 'ASC' } });

    return local;
  }

  public async findAllByTag(tag_id: string): Promise<Local[]> {
    const locais = await this.ormRepository.find({
      where: {
        tag: tag_id,
      },
    });

    return locais;
  }

  public async findById(local_id: number): Promise<Local | undefined> {
    const local = await this.ormRepository.findOne(local_id);

    return local;
  }

  public async create(localData: ICreateLocalDTO): Promise<Local> {
    const local = await this.ormRepository.create(localData);

    await this.ormRepository.save(local);

    return local;
  }

  public async save(local: Local): Promise<Local> {
    return this.ormRepository.save(local);
  }
}

export default LocaisRepository;
