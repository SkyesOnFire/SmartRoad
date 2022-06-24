import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Tag from '../infra/typeorm/entities/Tag';
import ITagsRepository from '../repositories/ITagsRepository';

@injectable()
class GetOneTagService {
  constructor(
    @inject('TagsRepository')
    private tagsRepository: ITagsRepository,
  ) {}

  public async execute(tag_id: number): Promise<Tag | undefined> {
    const tag: any = await this.tagsRepository.findById(tag_id);

    if (!tag) {
      throw new AppError('Tag não encontrada', 404);
    }

    tag.usuario = await tag.usuario;

    return tag;
  }
}

export default GetOneTagService;
