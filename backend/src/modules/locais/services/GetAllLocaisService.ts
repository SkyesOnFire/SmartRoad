import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

import Local from '../infra/typeorm/entities/Local';
import ILocaisRepository from '../repositories/ILocaisRepository';

@injectable()
class GetAllLocaisService {
  constructor(
    @inject('LocaisRepository')
    private locaisRepository: ILocaisRepository,
  ) {}

  public async execute(): Promise<Local[]> {
    const locais = await this.locaisRepository.findAll();

    if (!locais) {
      throw new AppError('Nenhum usuário foi encontrado', 404);
    }

    for (let i = 0; i < locais.length; i++) {
      const notificacao: any = locais[i];

      notificacao.tag = await notificacao.tag;
    }

    return locais;
  }
}

export default GetAllLocaisService;
