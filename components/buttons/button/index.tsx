import { Button as ButtonMUI } from '@mui/material';
import { FormikProps } from 'formik';
import { ButtonHTMLAttributes, FC, ReactNode } from 'react';

export interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  variant?: 'text' | 'contained';
  fullWidth?: boolean;
  size?: 'small' | 'medium' | 'large';
  type?: 'button' | 'submit' | 'reset';
  href?: string;
  appearance?: 'primary' | 'secondary';
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  disabled?: boolean;
}

export const handleDisabledButton = (formik: FormikProps<any>) => !(formik.dirty && formik.isValid);

const Button: FC<IButton> = ({
  type,
  form,
  href,
  startIcon,
  endIcon,
  disabled,
  label = '',
  variant = 'contained',
  fullWidth = true,
  size = 'medium',
  appearance = 'primary',
}) => {
  return (
    <ButtonMUI
      color={appearance}
      variant={variant}
      fullWidth={fullWidth}
      startIcon={startIcon}
      endIcon={endIcon}
      size={size}
      type={type}
      form={form}
      disabled={disabled}
      href={href}>
      {label}
    </ButtonMUI>
  );
};

export default Button;
