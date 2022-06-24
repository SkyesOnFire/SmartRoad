import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Local from '../infra/typeorm/entities/Local';
import ILocaisRepository from '../repositories/ILocaisRepository';

@injectable()
class GetOneLocalService {
  constructor(
    @inject('LocaisRepository')
    private locaisRepository: ILocaisRepository,
  ) { }

  public async execute(local_id: number): Promise<Local | undefined> {
    const local: any = await this.locaisRepository.findById(local_id);

    if (!local) {
      throw new AppError('Local não encontrado', 404);
    }

    local.usuario = await local.usuario;

    return local;
  }
}

export default GetOneLocalService;
