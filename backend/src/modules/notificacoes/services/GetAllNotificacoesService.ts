import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

import Notificacao from '../infra/typeorm/entities/Notificacao';
import INotificacoesRepository from '../repositories/INotificacoesRepository';

@injectable()
class GetAllNotificacoesService {
  constructor(
    @inject('NotificacoesRepository')
    private notificacoesRepository: INotificacoesRepository,
  ) {}

  public async execute(): Promise<Notificacao[]> {
    const notificacoes = await this.notificacoesRepository.findAll();

    if (!notificacoes) {
      throw new AppError('Nenhuma notificação foi encontrado', 404);
    }

    for (let i = 0; i < notificacoes.length; i++) {
      const notificacao: any = notificacoes[i];

      notificacao.tag = await notificacao.tag;
    }

    return notificacoes;
  }
}

export default GetAllNotificacoesService;
