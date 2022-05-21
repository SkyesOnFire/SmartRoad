import { hash } from 'bcryptjs';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Notificacao from '../infra/typeorm/entities/Notificacao';
import INotificacoesRepository from '../repositories/INotificacoesRepository';
import ITagsRepository from '@modules/tags/repositories/ITagsRepository';

interface IRequest {
  notificacao_id: number;
  dt_ocorrencia?: Date;
  tag_id?: number;
}

@injectable()
class UpdateNotificacaoService {
  constructor(
    @inject('NotificacoesRepository')
    private notificacoesRepository: INotificacoesRepository,

    @inject('TagsRepository')
    private tagsRepository: ITagsRepository,
  ) {}

  public async execute({
    notificacao_id,
    dt_ocorrencia,
    tag_id,
  }: IRequest): Promise<Notificacao> {
    const notificacao = await this.notificacoesRepository.findById(notificacao_id);

    if (!notificacao) {
      throw new AppError('Notificacao não existe.', 404);
    }

    if (dt_ocorrencia) {
      notificacao.dt_ocorrencia = dt_ocorrencia;
    }
    if (tag_id) {
      const tag = await this.tagsRepository.findById(tag_id);

      if(!tag) {
        throw new AppError('Tag não existente', 404);
      }

      notificacao.tag = Promise.resolve(tag);
    }

    await this.notificacoesRepository.save(notificacao);

    return notificacao;
  }
}

export default UpdateNotificacaoService;
