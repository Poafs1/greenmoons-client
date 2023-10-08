import { Box, Breadcrumbs as BreadcrumbsMUI, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import Link from 'next/link';
import { FC } from 'react';

export interface IBreadcrumbItem {
  label: string;
  href?: string;
}

export interface IBreadcrumbs {
  items: IBreadcrumbItem[];
}

const Breadcrumbs: FC<IBreadcrumbs> = ({ items }) => {
  return (
    <Box sx={{ padding: '1rem' }}>
      <BreadcrumbsMUI aria-label='breadcrumb'>
        {items.map((item, index) => {
          if (index === items.length - 1 || !item.href) {
            return (
              <Typography key={item.label} color='primary' variant='body1' fontWeight={700}>
                {item.label}
              </Typography>
            );
          }

          return (
            <Link href={item.href} key={item.label}>
              <Typography color={grey[800]} variant='body1'>
                {item.label}
              </Typography>
            </Link>
          );
        })}
      </BreadcrumbsMUI>
    </Box>
  );
};

export default Breadcrumbs;
