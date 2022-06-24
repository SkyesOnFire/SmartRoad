import { Router } from 'express';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import VeiculosController from '../controllers/VeiculosController';

const veiculosRouter = Router();

const veiculosController = new VeiculosController();

veiculosRouter.get(
  '/veiculo/:id',
  ensureAuthenticated,
  veiculosController.getone,
);

veiculosRouter.get('/', ensureAuthenticated, veiculosController.getall);

veiculosRouter.post('/', ensureAuthenticated, veiculosController.create);

veiculosRouter.put(
  '/veiculo/:id',
  ensureAuthenticated,
  veiculosController.update,
);

veiculosRouter.delete(
  '/veiculo/:id',
  ensureAuthenticated,
  veiculosController.delete,
);

export default veiculosRouter;
