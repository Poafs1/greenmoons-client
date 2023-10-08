import { Box } from '@mui/material';
import { ReactNode } from 'react';

export enum AspectRatioEnum {
  TWO_TO_THREE = '150%',
  ONE_TO_ONE = '100%',
  SIXTEEN_TO_NINE = '56.25%',
}

export interface IAspectRatioProps {
  ratio: AspectRatioEnum;
  children: ReactNode;
}

const AspectRatio = ({ ratio, children }: IAspectRatioProps) => {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        paddingTop: ratio,
        borderRadius: '8px',
        overflow: 'hidden',
      }}>
      {children}
    </Box>
  );
};

export default AspectRatio;
