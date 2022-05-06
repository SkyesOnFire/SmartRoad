import { Router } from 'express';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import UsuariosController from '../controllers/UsuariosController';

const usuariosRouter = Router();

const usuariosController = new UsuariosController();

usuariosRouter.get(
  '/usuario/:id',
  ensureAuthenticated,
  usuariosController.getone,
);

usuariosRouter.get('/', ensureAuthenticated, usuariosController.getall);

usuariosRouter.post('/', usuariosController.create);

usuariosRouter.put(
  '/usuario/:id',
  ensureAuthenticated,
  usuariosController.update,
);

usuariosRouter.delete(
  '/usuario/:id',
  ensureAuthenticated,
  usuariosController.delete,
);

export default usuariosRouter;
