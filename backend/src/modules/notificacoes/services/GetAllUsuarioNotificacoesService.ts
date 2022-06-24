import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

import Notificacao from '../infra/typeorm/entities/Notificacao';
import INotificacoesRepository from '../repositories/INotificacoesRepository';

interface IRequest {
  usuario_id: number;
}

@injectable()
class GetAllUsuarioNotificacoesService {
  constructor(
    @inject('NotificacoesRepository')
    private notificacoesRepository: INotificacoesRepository,
  ) {}

  public async execute({
    usuario_id
  }: IRequest): Promise<Notificacao[]> {
    const notificacoes = await this.notificacoesRepository.findAllByUsuario(usuario_id);

    if (!notificacoes) {
      throw new AppError('Nenhuma notificação foi encontrada', 404);
    }

    for (let i = 0; i < notificacoes.length; i++) {
      const notificacao: any = notificacoes[i];

      notificacao.tag = await notificacao.tag;
    }

    return notificacoes;
  }
}

export default GetAllUsuarioNotificacoesService;
