import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Veiculo from '../infra/typeorm/entities/Veiculo';
import IVeiculosRepository from '../repositories/IVeiculosRepository';

@injectable()
class GetOneVeiculoService {
  constructor(
    @inject('VeiculosRepository')
    private veiculosRepository: IVeiculosRepository,
  ) {}

  public async execute(veiculo_id: number): Promise<Veiculo | undefined> {
    const veiculo: any = await this.veiculosRepository.findById(veiculo_id);

    if (!veiculo) {
      throw new AppError('Veículo não encontrado', 404);
    }

    veiculo.tag = await veiculo.tag;

    return veiculo;
  }
}

export default GetOneVeiculoService;
