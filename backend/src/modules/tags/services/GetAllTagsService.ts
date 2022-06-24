import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

import Tag from '../infra/typeorm/entities/Tag';
import ITagsRepository from '../repositories/ITagsRepository';

@injectable()
class GetAllTagsService {
  constructor(
    @inject('TagsRepository')
    private tagsRepository: ITagsRepository,
  ) {}

  public async execute(): Promise<Tag[]> {
    const tags = await this.tagsRepository.findAll();

    if (!tags) {
      throw new AppError('Nenhuma tag foi encontrada', 404);
    }

    for (let i = 0; i < tags.length; i++) {
      const tag: any = tags[i];

      tag.usuario = await tag.usuario;
    }

    return tags;
  }
}

export default GetAllTagsService;
