import { injectable, inject } from 'tsyringe';

import INotificacoesRepository from '../repositories/INotificacoesRepository';
import Notificacao from '../infra/typeorm/entities/Notificacao';
import ITagsRepository from '@modules/tags/repositories/ITagsRepository';
import AppError from '@shared/errors/AppError';
import IUsuariosRepository from '@modules/usuarios/repositories/IUsuariosRepository';

interface IRequest {
  tag_id: number;
  dt_ocorrencia?: Date;
  name: string;
  usuario_id: number;
}

@injectable()
class CreateNotificacaoService {
  constructor(
    @inject('NotificacoesRepository')
    private notificacoesRepository: INotificacoesRepository,

    @inject('TagsRepository')
    private tagsRepository: ITagsRepository,

    @inject('UsuariosRepository')
    private usuariosRepository: IUsuariosRepository,
  ) { }

  public async execute({
    dt_ocorrencia,
    name,
    tag_id,
    usuario_id,
  }: IRequest): Promise<Notificacao> {
    const tag = await this.tagsRepository.findById(tag_id);

    if (!tag) {
      throw new AppError('Tag não existente', 404);
    }

    const usuario = await this.usuariosRepository.findById(usuario_id);

    if (!usuario) {
      throw new AppError("Usuário não existente", 404);
    }

    if (!dt_ocorrencia) {
      dt_ocorrencia = new Date();
    }

    let notificacao: any = await this.notificacoesRepository.create({
      dt_ocorrencia, name
    });

    notificacao.tag = Promise.resolve(tag);

    notificacao.usuario = Promise.resolve(usuario);

    notificacao = await this.notificacoesRepository.save(notificacao);

    return notificacao;
  }
}

export default CreateNotificacaoService;
