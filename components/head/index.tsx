/** @format */
import NextHead from 'next/head';
import { useTranslation } from 'react-i18next';
import { HOST } from '../../configs';

export interface IHeadProps {
  title?: string;
  description?: string;
}

const Head = (props: IHeadProps) => {
  const { t } = useTranslation();
  const { title, description } = props;

  return (
    <NextHead>
      <meta charSet='UTF-8' />
      <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
      <meta name='format-detection' content='telephone=no' />
      <meta name='mobile-web-app-capable' content='yes' />
      <meta
        name='viewport'
        content='minimum-scale=1, maximum-scale=5, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover'
      />
      <title>{title || t('brand')}</title>
      <meta name='description' content={description || t('components.head.defaultDescription') || ''} />
      <meta name='keywords' content={t('components.head.defaultKeywords') || ''} />
      <meta name='twitter:card' content='summary' />
      <meta name='twitter:url' content={HOST} />
      <meta name='twitter:title' content={title || ''} />
      <meta name='twitter:description' content={description || t('components.head.defaultDescription') || ''} />
      <meta name='twitter:creator' content='' />
      <meta property='og:type' content='website' />
      <meta property='og:title' content={title || ''} />
      <meta property='og:url' content={HOST} />
      <link rel='shortcut icon' href='/favicon.ico' type='image/x-icon' />
      <link rel='icon' href='/favicon.ico' type='image/x-icon'></link>
      <meta name='theme-color' content='#ffffff' />
    </NextHead>
  );
};

export default Head;
