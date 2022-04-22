import { container } from 'tsyringe';

import './providers';

import IUsuariosRepository from '@modules/usuarios/repositories/IUsuariosRepository';
import UsuariosRepository from '@modules/usuarios/infra/typeorm/repositories/UsuariosRepository';

container.registerSingleton<IUsuariosRepository>(
  'UsuariosRepository',
  UsuariosRepository,
);

