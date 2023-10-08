import { ReactElement, useEffect } from 'react';
import Layout from '../layouts';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { Box, Container, Stack, Typography } from '@mui/material';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import InputForm from '../components/forms/inputForm';
import Button, { handleDisabledButton } from '../components/buttons/button';
import { ISignInInput } from '../interfaces/auth';
import axios from 'axios';
import { CONSTANTS } from '../constants';
import { tokenGet, tokenSetAll } from '../utils/localstorage';
import { useRouter } from 'next/router';

function Home(): ReactElement {
  const { t } = useTranslation();
  const router = useRouter();

  useEffect(() => {
    const token = tokenGet(CONSTANTS.token.accessToken);

    if (token) {
      router.push(CONSTANTS.redirection.home);
    }
  }, []);

  const singInForm = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required('Required'),
      password: Yup.string().required('Required'),
    }),
    onSubmit: (values: ISignInInput) => handleSignIn(values),
  });

  const handleSignIn = async (values: ISignInInput) => {
    const { email, password } = values;

    try {
      const { data } = await axios.post(CONSTANTS.api.signIn, {
        email,
        password,
      });

      tokenSetAll(data);

      router.push(CONSTANTS.redirection.home);
    } catch {
      singInForm.setErrors({
        password: t('commons.somethingWentWrong'),
      });
    }
  };

  return (
    <Container
      maxWidth='xs'
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Stack spacing={16}>
        <Image src='/static/assets/brand/green_moons_logo.png' alt='Greemoons Logo' width={280} height={36} />
        <Stack spacing={8}>
          <Stack spacing={1}>
            <Typography variant='h1'>{t('pages.home.welcome')}</Typography>
            <Typography variant='body1'>{t('pages.home.pleaseEnterYourSignInDetailsBelow')}</Typography>
          </Stack>
          <Box component='form' onSubmit={singInForm.handleSubmit} id='signin-form'>
            <Stack spacing={10}>
              <Stack spacing={4}>
                <InputForm
                  label={t('pages.home.form.email.label')}
                  name='email'
                  type='text'
                  placeholder={t('pages.home.form.email.placeholder')}
                  formik={singInForm}
                />
                <InputForm
                  label={t('pages.home.form.password.label')}
                  type='password'
                  name='password'
                  placeholder={t('pages.home.form.password.placeholder')}
                  formik={singInForm}
                />
              </Stack>
              <Button
                type='submit'
                form='signin-form'
                label={t('pages.home.signIn')}
                disabled={handleDisabledButton(singInForm)}
              />
            </Stack>
          </Box>
        </Stack>
      </Stack>
    </Container>
  );
}

const HOCHome: any = Home;

HOCHome.getLayout = function GetLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default HOCHome;
