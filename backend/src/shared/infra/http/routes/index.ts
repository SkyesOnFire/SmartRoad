import { Router } from 'express';

import usuariosRouter from '@modules/usuarios/infra/http/routes/usuarios.routes';
import sessionsRouter from '@modules/usuarios/infra/http/routes/sessions.routes';
import tagsRouter from '@modules/tags/infra/http/routes/tags.routes';
import leiturasRouter from '@modules/leituras/infra/http/routes/leituras.routes';

const routes = Router();

routes.use('/usuarios', usuariosRouter);
routes.use('/sessions', sessionsRouter);

routes.use('/tags', tagsRouter);
routes.use('/leituras', leiturasRouter);

export default routes;
