import { Stack, TextField, Typography } from '@mui/material';
import { FormikProps } from 'formik';
import { FC } from 'react';

type InputType = 'text' | 'email' | 'password' | 'number' | 'date' | 'time';

export interface IInputFormProps {
  formik: FormikProps<any>;
  label?: string;
  name: string;
  type: InputType;
  placeholder?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  size?: 'small' | 'medium';
}

const InputForm: FC<IInputFormProps> = ({
  formik,
  label,
  name,
  type,
  placeholder,
  disabled,
  fullWidth = true,
  size = 'small',
}) => {
  return (
    <Stack spacing={1}>
      <TextField
        sx={{
          backgroundColor: '#fff',
        }}
        label={label}
        variant='outlined'
        fullWidth={fullWidth}
        size={size}
        id={name}
        placeholder={placeholder}
        disabled={disabled}
        type={type}
        {...{
          ...formik.getFieldProps(name),
          value: formik.values[name] || '',
        }}
      />
      {formik.touched[name] && formik.errors[name] && (
        <Typography variant='caption' color='error'>
          {formik.errors[name]?.toString()}
        </Typography>
      )}
    </Stack>
  );
};

export default InputForm;
