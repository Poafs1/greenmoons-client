import { ReactElement } from 'react';
import Layout from '../layouts';
import { Button } from '@mui/material';

function Home(): ReactElement {
  return (
    <div>
      <h1>Home Page</h1>
      <Button variant="contained">Hello world</Button>
    </div>
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
