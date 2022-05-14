import { injectable, inject } from 'tsyringe';

import ILocaisRepository from '../repositories/ILocaisRepository';
import Local from '../infra/typeorm/entities/Local';
import ITagsRepository from '@modules/tags/repositories/ITagsRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  dt_ocorrencia?: Date;
  tag_id: number;
}

@injectable()
class CreateLocalService {
  constructor(
    @inject('LocaisRepository')
    private locaisRepository: ILocaisRepository,

    @inject('TagsRepository')
    private tagsRepository: ITagsRepository,
  ) {}

  public async execute({
    dt_ocorrencia,
    tag_id,
  }: IRequest): Promise<Local> {
    const tag = await this.tagsRepository.findById(tag_id);

    if (!tag) {
      throw new AppError('Tag não existente', 404);
    }

    if (!dt_ocorrencia) {
      dt_ocorrencia = new Date();
    }

    let notificacao = await this.locaisRepository.create({
      dt_ocorrencia,
    });

    notificacao.tag = Promise.resolve(tag);

    notificacao = await this.locaisRepository.save(notificacao);

    return notificacao;
  }
}

export default CreateLocalService;
