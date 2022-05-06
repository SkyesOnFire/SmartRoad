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
      throw new AppError('Nenhum usuário foi encontrado', 404);
    }

    return tags;
  }
}

export default GetAllTagsService;
