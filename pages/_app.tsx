import '../i18n/i18n';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';
import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from '../theme';
import axios from 'axios';
import { SERVER } from '../configs';
import { ContentTypeEnum } from '../enums/contentType';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  axios.defaults.baseURL = SERVER;
  axios.defaults.headers['Content-Type'] = ContentTypeEnum.APPLICATION_JSON;

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>{getLayout(<Component {...pageProps} />)}</ThemeProvider>
    </>
  );
}

export default MyApp;
