import { hash } from 'bcryptjs';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Local from '../infra/typeorm/entities/Local';
import ILocaisRepository from '../repositories/ILocaisRepository';
import ITagsRepository from '@modules/tags/repositories/ITagsRepository';

interface IRequest {
  notificacao_id: number;
  dt_ocorrencia?: Date;
  tag_id?: number;
}

@injectable()
class UpdateLocalService {
  constructor(
    @inject('LocaisRepository')
    private locaisRepository: ILocaisRepository,

    @inject('TagsRepository')
    private tagsRepository: ITagsRepository,
  ) {}

  public async execute({
    notificacao_id,
    dt_ocorrencia,
    tag_id,
  }: IRequest): Promise<Local> {
    const notificacao = await this.locaisRepository.findById(notificacao_id);

    if (!notificacao) {
      throw new AppError('Local não existe.', 404);
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

    await this.locaisRepository.save(notificacao);

    return notificacao;
  }
}

export default UpdateLocalService;
