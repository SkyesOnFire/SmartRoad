import { container } from 'tsyringe';

import './providers';

import IUsuariosRepository from '@modules/usuarios/repositories/IUsuariosRepository';
import UsuariosRepository from '@modules/usuarios/infra/typeorm/repositories/UsuariosRepository';

import ITagsRepository from '@modules/tags/repositories/ITagsRepository';
import TagsRepository from '@modules/tags/infra/typeorm/repositories/TagsRepository';

import ILeiturasRepository from '@modules/leituras/repositories/ILeiturasRepository';
import LeiturasRepository from '@modules/leituras/infra/typeorm/repositories/LeiturasRepository';

import IVeiculosRepository from '@modules/veiculos/repositories/IVeiculosRepository';
import VeiculosRepository from '@modules/veiculos/infra/typeorm/repositories/VeiculosRepository';


container.registerSingleton<IUsuariosRepository>(
  'UsuariosRepository',
  UsuariosRepository,
);

container.registerSingleton<ILeiturasRepository>(
  'LeiturasRepository',
  LeiturasRepository,
);

container.registerSingleton<ITagsRepository>(
  'TagsRepository',
  TagsRepository,
);

container.registerSingleton<IVeiculosRepository>(
  'VeiculosRepository',
  VeiculosRepository,
);

