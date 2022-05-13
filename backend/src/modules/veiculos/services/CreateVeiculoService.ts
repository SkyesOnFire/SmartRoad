import { injectable, inject } from 'tsyringe';

import IVeiculosRepository from '../repositories/IVeiculosRepository';
import Veiculo from '../infra/typeorm/entities/Veiculo';
import ITagsRepository from '@modules/tags/repositories/ITagsRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  placa: string;
  renavam?: string;
  cor: string;
  marca: string;
  modelo: string;
}

@injectable()
class CreateVeiculoService {
  constructor(
    @inject('VeiculosRepository')
    private veiculosRepository: IVeiculosRepository,

    @inject('TagsRepository')
    private tagsRepository: ITagsRepository,
  ) {}

  public async execute({
    placa,
    renavam,
    cor,
    marca,
    modelo,
  }: IRequest): Promise<Veiculo> {
    const veiculo = await this.veiculosRepository.create({
      placa,
      renavam,
      cor,
      marca,
      modelo,
    });

    return veiculo;
  }
}

export default CreateVeiculoService;
