import InfiniteScroll from 'react-infinite-scroll-component';
import { IMovie, IMovies } from '../../../interfaces/movie';
import { FC, useCallback } from 'react';
import { Box, ImageList, ImageListItem, Stack, Typography, useMediaQuery } from '@mui/material';
import { theme } from '../../../theme';
import Link from 'next/link';
import { CONSTANTS } from '../../../constants';
import Image from 'next/image';
import FavoriteButton, { IFavoriteButton } from '../../buttons/favorite';
import { grey } from '@mui/material/colors';
import AspectRatio, { AspectRatioEnum } from '../../elements/aspectRatio';

export interface IMoviesListing {
  movies?: IMovies;
  onMutateMovies: () => void;
  favoriteButton: Pick<IFavoriteButton, 'onClick'>;
}

const MoviesListing: FC<IMoviesListing> = ({ movies, onMutateMovies, favoriteButton }) => {
  const isLargeScreen = useMediaQuery(theme.breakpoints.down('lg'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));

  const renderMovie = (movie: IMovie) => {
    return (
      <Stack spacing={2}>
        <Link
          href={{
            pathname: CONSTANTS.redirection.movieById,
            query: { id: movie.id },
          }}>
          <AspectRatio ratio={AspectRatioEnum.TWO_TO_THREE}>
            <Image
              src={movie.poster_url}
              alt={movie.title_en}
              fill
              style={{ objectFit: 'cover', height: '100%', position: 'absolute' }}
            />
          </AspectRatio>
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
              <FavoriteButton {...favoriteButton} movie={movie} />
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

  return (
    <InfiniteScroll
      dataLength={movies?.edges.length || 0}
      next={onMutateMovies}
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
  );
};

export default MoviesListing;
