import { hash } from 'bcryptjs';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Tag from '../infra/typeorm/entities/Tag';
import ITagsRepository from '../repositories/ITagsRepository';

interface IRequest {
  tag_id: number;
  cod_tag?: string;
}

@injectable()
class UpdateTagService {
  constructor(
    @inject('TagsRepository')
    private tagsRepository: ITagsRepository,
  ) {}

  public async execute({
    tag_id,
    cod_tag,
  }: IRequest): Promise<Tag> {
    const tag: any = await this.tagsRepository.findById(tag_id);

    if (!tag) {
      throw new AppError('Tag não existe.', 404);
    }

    if (cod_tag) {
      const alreadyUsedCodTag = await this.tagsRepository.findByTag(cod_tag);
      if (alreadyUsedCodTag && tag.cod_tag !== cod_tag) {
        throw new AppError('Esse código de tag já foi usado.');
      }
      tag.cod_tag = cod_tag;
    }

    await this.tagsRepository.save(tag);

    return tag;
  }
}

export default UpdateTagService;
