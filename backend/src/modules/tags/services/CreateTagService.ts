import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ITagsRepository from '../repositories/ITagsRepository';
import Tag from '../infra/typeorm/entities/Tag';

interface IRequest {
  cod_tag: string;
}

@injectable()
class CreateTagService {
  constructor(
    @inject('TagsRepository')
    private tagsRepository: ITagsRepository,
  ) {}

  public async execute({
    cod_tag,
  }: IRequest): Promise<Tag> {
    const checkIfExists = await this.tagsRepository.findByTag(cod_tag);

    if (checkIfExists) {
      throw new AppError('Esse código de tag já foi usado em outra tag.', 403);
    }

    const tag = await this.tagsRepository.create({
      cod_tag,
    });

    return tag;
  }
}

export default CreateTagService;
