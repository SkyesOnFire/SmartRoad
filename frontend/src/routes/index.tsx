import React from 'react';
import { Switch } from 'react-router-dom';

import Login from 'pages/Login';

import Pag404 from 'pages/404';

import Cadastros from 'pages/Cadastros';
import Usuarios from 'pages/Cadastros/Internas/Usuarios';
import NovoUsuario from 'pages/Cadastros/Internas/Usuarios/novo';
import UsuariosInterna from 'pages/Cadastros/Internas/Usuarios/interna';

import Tags from 'pages/Cadastros/Internas/Tags';
import NovaTag from 'pages/Cadastros/Internas/Tags/novo';
import TagsInterna from 'pages/Cadastros/Internas/Tags/interna';

import Dashboard from 'pages/Dashboard';

import Route from './Route';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/login" exact component={Login} />

    <Route path="/" exact component={Dashboard} isPrivate />

    {/* Cadastros */}
    <Route path="/cadastros" exact component={Cadastros} isPrivate />
    {/* ------ */}
    <Route path="/cadastros/usuarios" exact component={Usuarios} isPrivate />
    <Route
      path="/cadastros/usuarios/novo"
      exact
      component={NovoUsuario}
      isPrivate
    />
    <Route
      path="/cadastros/usuarios/usuario/:id"
      exact
      component={UsuariosInterna}
      isPrivate
    />
    {/* ------ */}
    <Route path="/tags" exact component={Tags} isPrivate />
    <Route path="/tags/novo" exact component={NovaTag} isPrivate />
    <Route path="/tags/tag/:id" exact component={TagsInterna} isPrivate />

    <Route component={Pag404} isPrivate />
  </Switch>
);

export default Routes;
