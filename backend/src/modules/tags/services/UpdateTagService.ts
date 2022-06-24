import { hash } from 'bcryptjs';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Tag from '../infra/typeorm/entities/Tag';
import ITagsRepository from '../repositories/ITagsRepository';
import IUsuariosRepository from '@modules/usuarios/repositories/IUsuariosRepository';

interface IRequest {
  tag_id: number;
  cod_tag?: string;
  usuario_id?: number;
}

@injectable()
class UpdateTagService {
  constructor(
    @inject('TagsRepository')
    private tagsRepository: ITagsRepository,

    @inject('UsuariosRepository')
    private usuariosRepository: IUsuariosRepository,
  ) {}

  public async execute({
    tag_id,
    cod_tag,
    usuario_id,
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

    if (usuario_id) {
      const usuario = await this.usuariosRepository.findById(usuario_id);

      if (!usuario) {
        throw new AppError("Usuário não existente", 404);
      }

      tag.usuario = Promise.resolve(usuario);
    }

    await this.tagsRepository.save(tag);

    return tag;
  }
}

export default UpdateTagService;
