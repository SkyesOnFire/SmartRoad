import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Leitura from '../infra/typeorm/entities/Leitura';
import ILeiturasRepository from '../repositories/ILeiturasRepository';

@injectable()
class GetOneLeituraService {
  constructor(
    @inject('LeiturasRepository')
    private leiturasRepository: ILeiturasRepository,
  ) {}

  public async execute(leitura_id: number): Promise<Leitura | undefined> {
    const leitura: any = await this.leiturasRepository.findById(leitura_id);

    if (!leitura) {
      throw new AppError('Usuário não encontrado', 404);
    }

    leitura.tag = await leitura.tag;

    return leitura;
  }
}

export default GetOneLeituraService;
