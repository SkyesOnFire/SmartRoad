import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Local from '../infra/typeorm/entities/Local';
import ILocaisRepository from '../repositories/ILocaisRepository';

@injectable()
class GetOneLocalService {
  constructor(
    @inject('LocaisRepository')
    private locaisRepository: ILocaisRepository,
  ) {}

  public async execute(notificacao_id: number): Promise<Local | undefined> {
    const notificacao: any = await this.locaisRepository.findById(notificacao_id);

    if (!notificacao) {
      throw new AppError('Usuário não encontrado', 404);
    }

    notificacao.tag = await notificacao.tag;

    return notificacao;
  }
}

export default GetOneLocalService;
