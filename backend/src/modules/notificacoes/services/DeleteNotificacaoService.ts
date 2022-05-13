import { DeleteResult } from 'typeorm';
import { injectable, inject } from 'tsyringe';

import INotificacoesRepository from '../repositories/INotificacoesRepository';

@injectable()
class DeleteNotificacaoService {
  constructor(
    @inject('NotificacoesRepository')
    private notificacoesRepository: INotificacoesRepository,
  ) {}

  public async execute(notificacao_id: number): Promise<DeleteResult> {
    const notificacao = await this.notificacoesRepository.delete(notificacao_id);

    return notificacao;
  }
}

export default DeleteNotificacaoService;
