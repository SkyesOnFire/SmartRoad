import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

import Local from '../infra/typeorm/entities/Local';
import ILocaisRepository from '../repositories/ILocaisRepository';

@injectable()
class GetAllLocaisService {
  constructor(
    @inject('LocaisRepository')
    private locaisRepository: ILocaisRepository,
  ) { }

  public async execute(): Promise<Local[]> {
    const locais: any = await this.locaisRepository.findAll();

    if (!locais) {
      throw new AppError('Nenhum usuário foi encontrado', 404);
    }

    for (let i = 0; i < locais.length; i++) {
      const local: any = locais[i];

      local.tag = await local.tag;
    }

    return locais;
  }
}

export default GetAllLocaisService;
