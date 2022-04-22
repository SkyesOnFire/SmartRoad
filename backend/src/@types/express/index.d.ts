declare namespace Express {
  interface Request {
    usuario: {
      id: number;
      cod_perfil: number;
    };
  }
}
