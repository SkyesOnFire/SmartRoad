import React from 'react';
import { Switch } from 'react-router-dom';

import Login from 'pages/Login';

import Pag404 from 'pages/404';

import Cadastros from 'pages/Cadastros';
import Usuarios from 'pages/Cadastros/Internas/Usuarios';
import NovoUsuario from 'pages/Cadastros/Internas/Usuarios/novo';
import UsuariosInterna from 'pages/Cadastros/Internas/Usuarios/interna';
import Departamentos from 'pages/Cadastros/Internas/Departamentos';
import NovoDepartamento from 'pages/Cadastros/Internas/Departamentos/novo';
import DepartamentosInterna from 'pages/Cadastros/Internas/Departamentos/interna';
import Serviços from 'pages/Cadastros/Internas/Serviços';
import NovoServico from 'pages/Cadastros/Internas/Serviços/novo';
import ServicosInterna from 'pages/Cadastros/Internas/Serviços/interna';
import FormasPagamento from 'pages/Cadastros/Internas/FormasPagamento';
import NovaFormaPagamento from 'pages/Cadastros/Internas/FormasPagamento/novo';
import FormaPagamentoInterna from 'pages/Cadastros/Internas/FormasPagamento/interna';
import Terceiros from 'pages/Cadastros/Internas/Terceiros';
import NovoTerceiro from 'pages/Cadastros/Internas/Terceiros/novo';
import TerceirosInterna from 'pages/Cadastros/Internas/Terceiros/interna';
import SetoresCliente from 'pages/Cadastros/Internas/SetoresCliente';
import NovoSetorCliente from 'pages/Cadastros/Internas/SetoresCliente/novo';
import SetorClienteInterna from 'pages/Cadastros/Internas/SetoresCliente/interna';
import LPS from 'pages/Cadastros/Internas/LPS';
import NovoLPS from 'pages/Cadastros/Internas/LPS/novo';
import LPSInterna from 'pages/Cadastros/Internas/LPS/interna';
import Clientes from 'pages/Cadastros/Internas/Clientes';
import NovoCliente from 'pages/Cadastros/Internas/Clientes/novo';
import ClientesInterna from 'pages/Cadastros/Internas/Clientes/interna';

import Dashboard from 'pages/Dashboard';

import NovoProjeto from 'pages/NovoProjeto';
import Projetos from 'pages/Projetos';
import Projeto from 'pages/Projeto';

import Tarefas from 'pages/Tarefas';

import Financeiro from 'pages/Financeiro';

import Route from './Route';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/login" exact component={Login} />

    <Route path="/" exact component={Dashboard} isPrivate />

    {/* Cadastros */}
    <Route path="/cadastros" exact component={Cadastros} isPrivate isCadastro />
    {/* ------ */}
    <Route
      path="/cadastros/usuarios"
      exact
      component={Usuarios}
      isPrivate
      isCadastro
    />
    <Route
      path="/cadastros/usuarios/novo"
      exact
      component={NovoUsuario}
      isPrivate
      isCadastro
    />
    <Route
      path="/cadastros/usuarios/usuario/:id"
      exact
      component={UsuariosInterna}
      isPrivate
      isCadastro
    />
    {/* ------ */}
    <Route
      path="/cadastros/departamentos"
      exact
      component={Departamentos}
      isPrivate
      isCadastro
    />
    <Route
      path="/cadastros/departamentos/novo"
      exact
      component={NovoDepartamento}
      isPrivate
      isCadastro
    />
    <Route
      path="/cadastros/departamentos/departamento/:id"
      exact
      component={DepartamentosInterna}
      isPrivate
      isCadastro
    />
    {/* ------  */}
    <Route
      path="/cadastros/servicos"
      exact
      component={Serviços}
      isPrivate
      isCadastro
    />
    <Route
      path="/cadastros/servicos/novo"
      exact
      component={NovoServico}
      isPrivate
      isCadastro
    />
    <Route
      path="/cadastros/servicos/servico/:id"
      exact
      component={ServicosInterna}
      isPrivate
      isCadastro
    />
    {/* ------  */}
    <Route
      path="/cadastros/formas-pagamento"
      exact
      component={FormasPagamento}
      isPrivate
      isCadastro
    />
    <Route
      path="/cadastros/formas-pagamento/novo"
      exact
      component={NovaFormaPagamento}
      isPrivate
      isCadastro
    />
    <Route
      path="/cadastros/formas-pagamento/forma-pagamento/:id"
      exact
      component={FormaPagamentoInterna}
      isPrivate
      isCadastro
    />
    {/* ------  */}
    <Route
      path="/cadastros/terceiros"
      exact
      component={Terceiros}
      isPrivate
      isCadastro
    />
    <Route
      path="/cadastros/terceiros/novo"
      exact
      component={NovoTerceiro}
      isPrivate
      isCadastro
    />
    <Route
      path="/cadastros/terceiros/terceiro/:id"
      exact
      component={TerceirosInterna}
      isPrivate
      isCadastro
    />
    {/* ------  */}
    <Route
      path="/cadastros/setores-cliente"
      exact
      component={SetoresCliente}
      isPrivate
      isCadastro
    />
    <Route
      path="/cadastros/setores-cliente/novo"
      exact
      component={NovoSetorCliente}
      isPrivate
      isCadastro
    />
    <Route
      path="/cadastros/setores-cliente/setor-cliente/:id"
      exact
      component={SetorClienteInterna}
      isPrivate
      isCadastro
    />
    {/* ------  */}
    <Route path="/cadastros/lps" exact component={LPS} isPrivate isCadastro />
    <Route
      path="/cadastros/lps/novo"
      exact
      component={NovoLPS}
      isPrivate
      isCadastro
    />
    <Route
      path="/cadastros/lps/lps-id/:id"
      exact
      component={LPSInterna}
      isPrivate
      isCadastro
    />
    {/* ------  */}
    <Route
      path="/cadastros/clientes"
      exact
      component={Clientes}
      isPrivate
      isCadastro
    />
    <Route
      path="/cadastros/clientes/novo"
      exact
      component={NovoCliente}
      isPrivate
      isCadastro
    />
    <Route
      path="/cadastros/clientes/cliente/:id"
      exact
      component={ClientesInterna}
      isPrivate
      isCadastro
    />

    <Route path="/tarefas" exact component={Tarefas} isPrivate />

    <Route path="/financeiro" exact component={Financeiro} isPrivate isAdmin />

    <Route path="/projetos" exact component={Projetos} isPrivate />
    <Route path="/projetos/novo" exact component={NovoProjeto} isPrivate />
    <Route path="/projetos/projeto/:id" exact component={Projeto} isPrivate />

    <Route component={Pag404} isPrivate />
  </Switch>
);

export default Routes;
