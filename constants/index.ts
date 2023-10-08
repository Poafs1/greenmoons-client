import { SERVER } from '../configs';

export interface IConstants {
  brand: string;
  token: {
    accessToken: string;
    refreshToken: string;
  };
  redirection: {
    home: string;
    signIn: string;
  };
  api: {
    signIn: string;
  };
}

export const CONSTANTS: IConstants = {
  brand: 'Greenmoons',
  token: {
    accessToken: 'access_token',
    refreshToken: 'refresh_token',
  },
  redirection: {
    home: '/home',
    signIn: '/',
  },
  api: {
    signIn: `${SERVER}/api/auth/signin`,
  },
};
