import { Router } from 'express';

import usuariosRouter from '@modules/usuarios/infra/http/routes/usuarios.routes';
import sessionsRouter from '@modules/usuarios/infra/http/routes/sessions.routes';
import tagsRouter from '@modules/tags/infra/http/routes/tags.routes';
import leiturasRouter from '@modules/leituras/infra/http/routes/leituras.routes';
import veiculosRouter from '@modules/veiculos/infra/http/routes/veiculos.routes';
import locaisRouter from '@modules/locais/infra/http/routes/locais.routes';
import notificacoesRouter from '@modules/notificacoes/infra/http/routes/notificacoes.routes';

const routes = Router();

routes.use('/usuarios', usuariosRouter);
routes.use('/sessions', sessionsRouter);

routes.use('/veiculos', veiculosRouter);
routes.use('/tags', tagsRouter);
routes.use('/leituras', leiturasRouter);
routes.use('/locais', locaisRouter);
routes.use('/notificacoes', notificacoesRouter);

export default routes;
