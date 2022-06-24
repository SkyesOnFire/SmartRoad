import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

import Leitura from '../infra/typeorm/entities/Leitura';
import ILeiturasRepository from '../repositories/ILeiturasRepository';

@injectable()
class GetAllLeiturasService {
  constructor(
    @inject('LeiturasRepository')
    private leiturasRepository: ILeiturasRepository,
  ) {}

  public async execute(): Promise<Leitura[]> {
    const leituras = await this.leiturasRepository.findAll();

    if (!leituras) {
      throw new AppError('Nenhuma leitura foi encontrada', 404);
    }

    for (let i = 0; i < leituras.length; i++) {
      const leitura: any = leituras[i];

      leitura.local = await leitura.local;
      leitura.tag = await leitura.tag;
    }

    return leituras;
  }
}

export default GetAllLeiturasService;
