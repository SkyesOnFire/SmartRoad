import { DeleteResult, getRepository, Repository } from 'typeorm';

import ILeiturasRepository from '@modules/leituras/repositories/ILeiturasRepository';
import ICreateLeituraDTO from '@modules/leituras/dtos/ICreateLeituraDTO';

import Leitura from '../entities/Leitura';

class LeiturasRepository implements ILeiturasRepository {
  private ormRepository: Repository<Leitura>;

  constructor() {
    this.ormRepository = getRepository(Leitura);
  }

  public async delete(leitura_id: number): Promise<DeleteResult> {
    const leitura = await this.ormRepository.delete(leitura_id);

    return leitura;
  }

  public async findAllByUsuario(usuario_id: number): Promise<Leitura[]> {
    const leituras = await this.ormRepository
      .createQueryBuilder('leitura')
      .leftJoinAndSelect('leitura.tag', 'tag')
      .where(`tag.usuarioId = ${usuario_id}`)
      .orderBy({
        "id": "ASC"
      })
      .getMany();

    return leituras;
  }

  public async findAll(): Promise<Leitura[]> {
    const leitura = await this.ormRepository.find({ order: { id: 'ASC' } });

    return leitura;
  }

  public async findAllByTag(tag_id: string): Promise<Leitura[]> {
    const leituras = await this.ormRepository.find({
      where: {
        tag: tag_id,
      },
    });

    return leituras;
  }

  public async findById(leitura_id: number): Promise<Leitura | undefined> {
    const leitura = await this.ormRepository.findOne(leitura_id);

    return leitura;
  }

  public async create(leituraData: ICreateLeituraDTO): Promise<Leitura> {
    const leitura = await this.ormRepository.create(leituraData);

    await this.ormRepository.save(leitura);

    return leitura;
  }

  public async save(leitura: Leitura): Promise<Leitura> {
    return this.ormRepository.save(leitura);
  }
}

export default LeiturasRepository;
