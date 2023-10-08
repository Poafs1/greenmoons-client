import { ReactNode } from 'react';
import Head from '../components/head';

export interface ILayoutProps {
  title?: string;
  description?: string;
  children: ReactNode;
}

const Layout = (props: ILayoutProps) => {
  const { title, description, children } = props;

  return (
    <div id='app-container'>
      <Head title={title} description={description} />
      <div>
        <div
          style={{
            minHeight: '100vh',
          }}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
