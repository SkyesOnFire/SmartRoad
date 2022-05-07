import { DeleteResult, getRepository, Repository } from 'typeorm';

import IVeiculosRepository from '@modules/veiculos/repositories/IVeiculosRepository';
import ICreateVeiculoDTO from '@modules/veiculos/dtos/ICreateVeiculoDTO';

import Veiculo from '../entities/Veiculo';

class VeiculosRepository implements IVeiculosRepository {
  private ormRepository: Repository<Veiculo>;

  constructor() {
    this.ormRepository = getRepository(Veiculo);
  }

  public async delete(veiculo_id: number): Promise<DeleteResult> {
    const veiculo = await this.ormRepository.delete(veiculo_id);

    return veiculo;
  }

  public async findAll(): Promise<Veiculo[]> {
    const veiculo = await this.ormRepository.find({ order: { id: 'ASC' } });

    return veiculo;
  }

  public async findAllByTag(tag_id: string): Promise<Veiculo[]> {
    const veiculos = await this.ormRepository.find({
      where: {
        tag: tag_id,
      },
    });

    return veiculos;
  }

  public async findById(veiculo_id: number): Promise<Veiculo | undefined> {
    const veiculo = await this.ormRepository.findOne(veiculo_id);

    return veiculo;
  }

  public async create(veiculoData: ICreateVeiculoDTO): Promise<Veiculo> {
    const veiculo = await this.ormRepository.create(veiculoData);

    await this.ormRepository.save(veiculo);

    return veiculo;
  }

  public async save(veiculo: Veiculo): Promise<Veiculo> {
    return this.ormRepository.save(veiculo);
  }
}

export default VeiculosRepository;
