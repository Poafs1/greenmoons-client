import { ReactElement } from 'react';
import Layout from '../layouts';

function Home(): ReactElement {
  return (
    <div>Home Page</div>
  );
}

const HOCHome: any = Home;

HOCHome.getLayout = function GetLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  );
};

export default HOCHome;
