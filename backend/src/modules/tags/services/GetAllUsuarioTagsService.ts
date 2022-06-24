import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

import Tag from '../infra/typeorm/entities/Tag';
import ITagsRepository from '../repositories/ITagsRepository';

interface IRequest {
  usuario_id: number;
}

@injectable()
class GetAllUsuarioTagsService {
  constructor(
    @inject('TagsRepository')
    private tagsRepository: ITagsRepository,
  ) {}

  public async execute({
    usuario_id
  }: IRequest): Promise<Tag[]> {
    const tags = await this.tagsRepository.findAllByUsuario(usuario_id);

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

export default GetAllUsuarioTagsService;
