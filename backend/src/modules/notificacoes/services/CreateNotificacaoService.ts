import { injectable, inject } from 'tsyringe';

import INotificacoesRepository from '../repositories/INotificacoesRepository';
import Notificacao from '../infra/typeorm/entities/Notificacao';
import ITagsRepository from '@modules/tags/repositories/ITagsRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  dt_ocorrencia?: Date;
  tag_id: number;
}

@injectable()
class CreateNotificacaoService {
  constructor(
    @inject('NotificacoesRepository')
    private notificacoesRepository: INotificacoesRepository,

    @inject('TagsRepository')
    private tagsRepository: ITagsRepository,
  ) {}

  public async execute({
    dt_ocorrencia,
    tag_id,
  }: IRequest): Promise<Notificacao> {
    const tag = await this.tagsRepository.findById(tag_id);

    if (!tag) {
      throw new AppError('Tag não existente', 404);
    }

    if (!dt_ocorrencia) {
      dt_ocorrencia = new Date();
    }

    let notificacao = await this.notificacoesRepository.create({
      dt_ocorrencia,
    });

    notificacao.tag = Promise.resolve(tag);

    notificacao = await this.notificacoesRepository.save(notificacao);

    return notificacao;
  }
}

export default CreateNotificacaoService;
