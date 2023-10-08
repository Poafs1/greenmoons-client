import { ReactElement, useCallback, useEffect, useMemo, useState } from 'react';
import Layout from '../layouts';
import WithPrivatePage from '../hoc/withPrivate';
import Sidebar from '../components/navigations/sidebar';
import useSWR from 'swr';
import { CONSTANTS } from '../constants';
import { fetcher } from '../utils/fetcher';
import { Box, ImageList, ImageListItem, Stack, Typography, useMediaQuery } from '@mui/material';
import Image from 'next/image';
import { IMovie, IMovies } from '../interfaces/movie';
import { grey } from '@mui/material/colors';
import { theme } from '../theme';
import FavoriteButton from '../components/buttons/favorite';
import Link from 'next/link';
import axios from 'axios';
import { tokenGet } from '../utils/localstorage';
import InfiniteScroll from 'react-infinite-scroll-component';
import { debounce } from 'lodash';

function Movies(): ReactElement {
  const [offset, setOffset] = useState(0);
  const limit = useMemo(() => 48, []);
  const { data, mutate } = useSWR<IMovies>(`${CONSTANTS.api.movie}?offset=${offset}&limit=${limit}`, fetcher);
  const isLargeScreen = useMediaQuery(theme.breakpoints.down('lg'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [movies, setMovies] = useState<IMovies>();

  useEffect(() => {
    if (!data) return;

    if (!movies) {
      setMovies(data);

      return;
    }

    const { pageInfo, edges } = data;

    const newMovies: IMovies = {
      ...movies,
      pageInfo,
    };

    newMovies.edges = [...newMovies.edges, ...edges];

    setMovies(newMovies);
  }, [data]);

  const handleToggleFavorite = async (movie: IMovie) => {
    if (!movies || !movies.edges?.length) return;

    await axios.patch(
      CONSTANTS.api.movie + `/${movie.id}/favorite`,
      {},
      {
        headers: {
          Authorization: `Bearer ${tokenGet(CONSTANTS.token.accessToken)}`,
        },
      },
    );

    const updateIndex = movies?.edges.findIndex(({ node }: { node: IMovie }) => node.id === movie.id);

    if (updateIndex === -1) return;

    movies.edges[updateIndex].node.is_favorite = !movies.edges[updateIndex].node.is_favorite;

    mutate({ ...movies });
  };

  const renderMovie = (movie: IMovie) => {
    return (
      <Stack spacing={2}>
        <Link
          href={{
            pathname: CONSTANTS.redirection.movieById,
            query: { id: movie.id },
          }}>
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              paddingTop: '150%',
              borderRadius: '8px',
              overflow: 'hidden',
            }}>
            <Image
              src={movie.poster_url}
              alt={movie.title_en}
              fill
              style={{ objectFit: 'cover', height: '100%', position: 'absolute' }}
            />
          </Box>
        </Link>
        <Box>
          <Stack spacing={2}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Link
                href={{
                  pathname: CONSTANTS.redirection.movieById,
                  query: { id: movie.id },
                }}>
                <Typography
                  variant='body1'
                  fontWeight={700}
                  style={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: '1',
                    WebkitBoxOrient: 'vertical',
                  }}>
                  {movie.title_en}
                </Typography>
              </Link>
              <FavoriteButton movie={movie} onClick={() => handleToggleFavorite(movie)} />
            </Box>
            <Link
              href={{
                pathname: CONSTANTS.redirection.movieById,
                query: { id: movie.id },
              }}>
              <Box>
                <Typography
                  variant='caption'
                  color={grey[800]}
                  style={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: '2',
                    WebkitBoxOrient: 'vertical',
                  }}>
                  {movie.synopsis_en}
                </Typography>
                <Typography
                  variant='caption'
                  style={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: '1',
                    WebkitBoxOrient: 'vertical',
                  }}>
                  {movie.actor}
                </Typography>
              </Box>
            </Link>
          </Stack>
        </Box>
      </Stack>
    );
  };

  const renderImageListCols = useCallback(() => {
    if (isMediumScreen) {
      return 2;
    }

    if (isLargeScreen) {
      return 3;
    }

    return 4;
  }, [isLargeScreen, isMediumScreen]);

  const handleMutateMovies = debounce(async () => {
    const newOffset = offset + limit;

    setOffset(newOffset);

    const newData = await fetcher(`${CONSTANTS.api.movie}?offset=${newOffset}&limit=${limit}`);

    mutate(newData);
  }, 1000);

  return (
    <Sidebar>
      <InfiniteScroll
        dataLength={movies?.edges.length || 0}
        next={handleMutateMovies}
        hasMore={movies?.pageInfo.hasNextPage || false}
        loader={null}
        scrollThreshold={0.8}>
        <Box
          sx={{
            padding: '1rem',
          }}>
          {movies && (
            <ImageList cols={renderImageListCols()} gap={16}>
              {movies?.edges?.map(({ node }: { node: IMovie }) => (
                <ImageListItem key={node.id}>{renderMovie(node)}</ImageListItem>
              ))}
            </ImageList>
          )}
        </Box>
      </InfiniteScroll>
    </Sidebar>
  );
}

const HOCMovies: any = WithPrivatePage(Movies);

HOCMovies.getLayout = function GetLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default HOCMovies;
