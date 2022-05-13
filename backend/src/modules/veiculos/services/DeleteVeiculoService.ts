import { DeleteResult } from 'typeorm';
import { injectable, inject } from 'tsyringe';

import IVeiculosRepository from '../repositories/IVeiculosRepository';

@injectable()
class DeleteVeiculoService {
  constructor(
    @inject('VeiculosRepository')
    private veiculosRepository: IVeiculosRepository,
  ) {}

  public async execute(veiculo_id: number): Promise<DeleteResult> {
    const veiculo = await this.veiculosRepository.delete(veiculo_id);

    return veiculo;
  }
}

export default DeleteVeiculoService;
