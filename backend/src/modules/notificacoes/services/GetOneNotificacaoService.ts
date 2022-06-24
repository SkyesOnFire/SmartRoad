import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Notificacao from '../infra/typeorm/entities/Notificacao';
import INotificacoesRepository from '../repositories/INotificacoesRepository';

@injectable()
class GetOneNotificacaoService {
  constructor(
    @inject('NotificacoesRepository')
    private notificacoesRepository: INotificacoesRepository,
  ) {}

  public async execute(notificacao_id: number): Promise<Notificacao | undefined> {
    const notificacao: any = await this.notificacoesRepository.findById(notificacao_id);

    if (!notificacao) {
      throw new AppError('Notificação não encontrada', 404);
    }

    notificacao.tag = await notificacao.tag;

    return notificacao;
  }
}

export default GetOneNotificacaoService;
