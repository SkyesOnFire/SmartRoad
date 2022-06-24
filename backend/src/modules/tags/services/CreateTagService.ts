import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ITagsRepository from '../repositories/ITagsRepository';
import Tag from '../infra/typeorm/entities/Tag';
import IUsuariosRepository from '@modules/usuarios/repositories/IUsuariosRepository';

interface IRequest {
  cod_tag: string;
  usuario_id: number;
}

@injectable()
class CreateTagService {
  constructor(
    @inject('TagsRepository')
    private tagsRepository: ITagsRepository,

    @inject('UsuariosRepository')
    private usuariosRepository: IUsuariosRepository,
  ) {}

  public async execute({
    cod_tag,
    usuario_id,
  }: IRequest): Promise<Tag> {
    const usuario = await this.usuariosRepository.findById(usuario_id);

    if (!usuario) {
      throw new AppError("Usuário não existente", 404);
    }

    const checkIfExists = await this.tagsRepository.findByTag(cod_tag);

    if (checkIfExists) {
      throw new AppError('Esse código de tag já foi usado em outra tag.', 403);
    }

    let tag = await this.tagsRepository.create({
      cod_tag,
    });

    tag.usuario = Promise.resolve(usuario);

    tag = await this.tagsRepository.save(tag);

    return tag;
  }
}

export default CreateTagService;
