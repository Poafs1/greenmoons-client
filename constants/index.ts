export interface IConstants {
  brand: string;
  token: {
    accessToken: string;
    refreshToken: string;
  };
  redirection: {
    movie: string;
    movieById: string;
    signIn: string;
  };
  api: {
    auth: string;
    users: string;
    movie: string;
  };
}

export const CONSTANTS: IConstants = {
  brand: 'Greenmoons',
  token: {
    accessToken: 'access_token',
    refreshToken: 'refresh_token',
  },
  redirection: {
    movie: '/movies',
    movieById: '/movies/[id]',
    signIn: '/',
  },
  api: {
    auth: '/api/auth',
    users: '/api/users',
    movie: '/api/movie',
  },
};
