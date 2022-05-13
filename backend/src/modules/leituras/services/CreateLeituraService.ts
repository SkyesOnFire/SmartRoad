import { injectable, inject } from 'tsyringe';

import ILeiturasRepository from '../repositories/ILeiturasRepository';
import Leitura from '../infra/typeorm/entities/Leitura';
import ITagsRepository from '@modules/tags/repositories/ITagsRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  dt_ocorrencia?: Date;
  tag_id: number;
}

@injectable()
class CreateLeituraService {
  constructor(
    @inject('LeiturasRepository')
    private leiturasRepository: ILeiturasRepository,

    @inject('TagsRepository')
    private tagsRepository: ITagsRepository,
  ) {}

  public async execute({
    dt_ocorrencia,
    tag_id,
  }: IRequest): Promise<Leitura> {
    const tag = await this.tagsRepository.findById(tag_id);

    if (!tag) {
      throw new AppError('Tag não existente', 404);
    }

    if (!dt_ocorrencia) {
      dt_ocorrencia = new Date();
    }

    let leitura = await this.leiturasRepository.create({
      dt_ocorrencia,
    });

    leitura.tag = Promise.resolve(tag);

    leitura = await this.leiturasRepository.save(leitura);

    return leitura;
  }
}

export default CreateLeituraService;
