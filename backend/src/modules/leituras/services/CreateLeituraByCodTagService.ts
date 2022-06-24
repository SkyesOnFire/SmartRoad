import { injectable, inject } from 'tsyringe';

import ILeiturasRepository from '../repositories/ILeiturasRepository';
import Leitura from '../infra/typeorm/entities/Leitura';
import ITagsRepository from '@modules/tags/repositories/ITagsRepository';
import AppError from '@shared/errors/AppError';
import ILocaisRepository from '@modules/locais/repositories/ILocaisRepository';

interface IRequest {
  tag_name: string;
  local_id: number;
}

@injectable()
class CreateLeituraByCodTagService {
  constructor(
    @inject('LeiturasRepository')
    private leiturasRepository: ILeiturasRepository,

    @inject('TagsRepository')
    private tagsRepository: ITagsRepository,

    @inject('LocaisRepository')
    private locaisRepository: ILocaisRepository,
  ) {}

  public async execute({
    tag_name,
    local_id,
  }: IRequest): Promise<Leitura> {
    const tag = await this.tagsRepository.findByTag(tag_name);

    if (!tag) {
      throw new AppError('Tag não existente', 404);
    }

    const local = await this.locaisRepository.findById(local_id);

    if (!local) {
      throw new AppError('Local não existente', 404);
    }

    const dt_ocorrencia = new Date();

    let leitura = await this.leiturasRepository.create({
      dt_ocorrencia,
    });

    leitura.tag = Promise.resolve(tag);
    leitura.local = Promise.resolve(local);

    leitura = await this.leiturasRepository.save(leitura);

    return leitura;
  }
}

export default CreateLeituraByCodTagService;
