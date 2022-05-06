/* eslint-disable camelcase */
import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface IUsuarios {
  id: number;
  nome: string;
  cod_perfil: number;
}

interface AuthState {
  token: string;
  usuario: IUsuarios;
}

interface SignInCredentials {
  cpf: string;
  senha: string;
}

interface AuthContextData {
  usuario: IUsuarios;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@SmartRoad:token');
    const usuario = localStorage.getItem('@SmartRoad:usuario');

    if (token && usuario) {
      api.defaults.headers.authorization = `Bearer ${token}`;

      return { token, usuario: JSON.parse(usuario) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ cpf, senha }) => {
    const res = await api.post('sessions', { cpf, senha });

    const { token, usuario } = res.data;

    localStorage.setItem('@SmartRoad:token', token);
    localStorage.setItem('@SmartRoad:usuario', JSON.stringify(usuario));

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, usuario });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@SmartRoad:token');
    localStorage.removeItem('@SmartRoad:usuario');

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ usuario: data.usuario, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
