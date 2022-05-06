import { hash } from 'bcryptjs';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Leitura from '../infra/typeorm/entities/Leitura';
import ILeiturasRepository from '../repositories/ILeiturasRepository';
import ITagsRepository from '@modules/tags/repositories/ITagsRepository';

interface IRequest {
  leitura_id: number;
  dt_ocorrencia?: Date;
  tag_id?: number;
}

@injectable()
class UpdateLeituraService {
  constructor(
    @inject('LeiturasRepository')
    private leiturasRepository: ILeiturasRepository,

    @inject('TagsRepository')
    private tagsRepository: ITagsRepository,
  ) {}

  public async execute({
    leitura_id,
    dt_ocorrencia,
    tag_id,
  }: IRequest): Promise<Leitura> {
    const leitura = await this.leiturasRepository.findById(leitura_id);

    if (!leitura) {
      throw new AppError('Leitura não existe.', 404);
    }

    if (dt_ocorrencia) {
      leitura.dt_ocorrencia = dt_ocorrencia;
    }
    if (tag_id) {
      const tag = await this.tagsRepository.findById(tag_id);

      if(!tag) {
        throw new AppError('Tag não existente', 404);
      }

      leitura.tag = Promise.resolve(tag);
    }

    await this.leiturasRepository.save(leitura);

    return leitura;
  }
}

export default UpdateLeituraService;
