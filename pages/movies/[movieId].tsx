import { ReactElement } from 'react';
import Sidebar from '../../components/navigations/sidebar';
import WithPrivatePage from '../../hoc/withPrivate';
import Layout from '../../layouts';
import { Box, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { CONSTANTS } from '../../constants';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { fetcher } from '../../utils/fetcher';
import { IMovie } from '../../interfaces/movie';
import AspectRatio, { AspectRatioEnum } from '../../components/elements/aspectRatio';
import Image from 'next/image';
import FavoriteButton from '../../components/buttons/favorite';
import axios from 'axios';
import { tokenGet } from '../../utils/localstorage';
import { green } from '@mui/material/colors';
import humanizeDuration from 'humanize-duration';
import { mapDateToDDMMYYYY } from '../../utils/date';

function Movie(): ReactElement {
  const { t } = useTranslation();
  const router = useRouter();
  const { data, mutate } = useSWR<IMovie>(
    router.query.movieId ? `${CONSTANTS.api.movie}/${router.query.movieId}` : null,
    fetcher,
  );

  const handleToggleFavorite = async (movie: IMovie | undefined) => {
    if (!movie) return;

    await axios.patch(
      CONSTANTS.api.movie + `/${movie.id}/favorite`,
      {},
      {
        headers: {
          Authorization: `Bearer ${tokenGet(CONSTANTS.token.accessToken)}`,
        },
      },
    );

    mutate({ ...movie, is_favorite: !movie.is_favorite });
  };

  return (
    <Sidebar
      breadcrumbs={{
        items: [
          {
            label: t('pages.movie.moviesFinder'),
            href: CONSTANTS.redirection.movies,
          },
          {
            label: data?.title_en || '',
          },
        ],
      }}>
      <Box sx={{ padding: '1rem' }}>
        <Stack spacing={10}>
          <Box sx={{ display: { md: 'flex', xs: 'block' }, gap: 8 }}>
            <Box sx={{ minWidth: '250px' }}>
              <AspectRatio ratio={AspectRatioEnum.TWO_TO_THREE}>
                {data && (
                  <Image
                    src={data.poster_url}
                    alt={data.title_en}
                    fill
                    style={{ objectFit: 'cover', height: '100%', position: 'absolute' }}
                  />
                )}
              </AspectRatio>
            </Box>
            <Box sx={{ mt: { md: '0px', xs: '32px' } }}>
              <Stack spacing={4}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography variant='h3'>{data?.title_en}</Typography>
                  <FavoriteButton movie={data} onClick={handleToggleFavorite} />
                </Box>
                <Typography variant='body1'>{data?.synopsis_en}</Typography>
                <Stack spacing={2}>
                  <Typography variant='body2'>
                    <Box component='span' fontWeight={700} color={green[900]}>
                      {t('pages.movie.director')}:{' '}
                    </Box>
                    {data?.director}
                  </Typography>
                  <Typography variant='body2'>
                    <Box component='span' fontWeight={700} color={green[900]}>
                      {t('pages.movie.actor')}:{' '}
                    </Box>
                    {data?.actor}
                  </Typography>
                  <Typography variant='body2'>
                    <Box component='span' fontWeight={700} color={green[900]}>
                      {t('pages.movie.genre')}:{' '}
                    </Box>
                    {data?.genre}
                  </Typography>
                  <Typography variant='body2'>
                    <Box component='span' fontWeight={700} color={green[900]}>
                      {t('pages.movie.rating')}:{' '}
                    </Box>
                    {data?.rating || '-'}
                  </Typography>
                  <Typography variant='body2'>
                    <Box component='span' fontWeight={700} color={green[900]}>
                      {t('pages.movie.duration')}:{' '}
                    </Box>
                    {data &&
                      humanizeDuration(data?.duration * 60 * 1000, {
                        delimiter: ' ',
                        largest: 2,
                        round: true,
                      })}
                  </Typography>
                  <Typography variant='body2'>
                    <Box component='span' fontWeight={700} color={green[900]}>
                      {t('pages.movie.releaseDate')}:{' '}
                    </Box>
                    {mapDateToDDMMYYYY(new Date(data?.release_date || ''))}
                  </Typography>
                </Stack>
              </Stack>
            </Box>
          </Box>
          <Box>
            <Stack spacing={8}>
              <Typography variant='h3'>{t('pages.movie.movieTrailer')}</Typography>
              <AspectRatio ratio={AspectRatioEnum.SIXTEEN_TO_NINE}>
                <video
                  controls
                  src={data?.tr_mp4}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                  }}
                />
              </AspectRatio>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </Sidebar>
  );
}

const HOCMovie: any = WithPrivatePage(Movie);

HOCMovie.getLayout = function GetLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default HOCMovie;
