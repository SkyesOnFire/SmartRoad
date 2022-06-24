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

import Veiculos from 'pages/Cadastros/Internas/Veiculos';
import VeiculosInterna from 'pages/Cadastros/Internas/Veiculos/interna';
import NovoVeiculo from 'pages/Cadastros/Internas/Veiculos/novo';

import Locais from 'pages/Cadastros/Internas/Locais';
import LocalInterna from 'pages/Cadastros/Internas/Locais/interna';
import NovoLocal from 'pages/Cadastros/Internas/Locais/novo';

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
    {/* ------ */}
    <Route path="/veiculos" exact component={Veiculos} isPrivate />
    <Route path="/veiculos/novo" exact component={NovoVeiculo} isPrivate />
    <Route
      path="/veiculos/veiculo/:id"
      exact
      component={VeiculosInterna}
      isPrivate
    />
    {/* ------ */}
    <Route path="/locais" exact component={Locais} isPrivate />
    <Route path="/locais/novo" exact component={NovoLocal} isPrivate />
    <Route path="/locais/local/:id" exact component={LocalInterna} isPrivate />

    <Route component={Pag404} isPrivate />
  </Switch>
);

export default Routes;
