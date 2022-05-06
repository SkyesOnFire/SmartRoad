import { DeleteResult } from 'typeorm';
import { injectable, inject } from 'tsyringe';

import ILeiturasRepository from '../repositories/ILeiturasRepository';

@injectable()
class DeleteLeituraService {
  constructor(
    @inject('LeiturasRepository')
    private leiturasRepository: ILeiturasRepository,
  ) {}

  public async execute(leitura_id: number): Promise<DeleteResult> {
    const leitura = await this.leiturasRepository.delete(leitura_id);

    return leitura;
  }
}

export default DeleteLeituraService;
