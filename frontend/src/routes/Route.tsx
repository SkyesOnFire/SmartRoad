import React from 'react';
import {
  Route as ReactDOMRoute,
  RouteProps as ReactDOMRouteProps,
  Redirect,
} from 'react-router-dom';

import AuthLayout from '../pages/_layouts/auth';
import AdminLayout from '../pages/_layouts/admin';
import DefaultLayout from '../pages/_layouts/default';

import { useAuth } from '../hooks/auth';

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  isAdmin?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  isAdmin = false,
  component: Component,
  ...rest
}) => {
  const auth = useAuth();
  const { usuario } = auth;
  let base = false;
  let admin = false;

  if (usuario) {
    switch (usuario.cod_perfil) {
      case 1:
        admin = true;
        break;
      default:
        base = true;
        break;
    }
  }

  return (
    <ReactDOMRoute
      {...rest}
      render={({ location }) => {
        // 1-login / 2-inicio / 0-normal
        let redirect = 0;

        if (!usuario && isPrivate && redirect === 0) {
          redirect = 1;
        }
        if (!!usuario && !isPrivate && redirect === 0) {
          redirect = 2;
        }
        if (base && isPrivate && redirect === 0) {
          redirect = 2;
        }
        if (!admin && isAdmin && redirect === 0) {
          redirect = 2;
        }

        switch (redirect) {
          case 1:
            return (
              <Redirect
                to={{ pathname: '/login', state: { from: location } }}
              />
            );
          case 2:
            return (
              <Redirect to={{ pathname: '/', state: { from: location } }} />
            );
          default:
            break;
        }

        let Layout = DefaultLayout;

        if (admin) {
          Layout = AdminLayout;
        } else {
          Layout = usuario ? AuthLayout : DefaultLayout;
        }

        return (
          <Layout>
            <Component />
          </Layout>
        );
      }}
    />
  );
};

export default Route;
