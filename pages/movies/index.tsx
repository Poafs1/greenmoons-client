import { ReactElement, useEffect, useMemo, useState } from 'react';
import Layout from '../../layouts';
import WithPrivatePage from '../../hoc/withPrivate';
import Sidebar from '../../components/navigations/sidebar';
import useSWR from 'swr';
import { CONSTANTS } from '../../constants';
import { fetcher } from '../../utils/fetcher';
import { IMovie, IMovies } from '../../interfaces/movie';
import axios from 'axios';
import { tokenGet } from '../../utils/localstorage';
import { debounce } from 'lodash';
import MoviesListing from '../../components/templates/movies/moviesListing';

function Movies(): ReactElement {
  const [offset, setOffset] = useState(0);
  const limit = useMemo(() => 48, []);
  const { data, mutate } = useSWR<IMovies>(`${CONSTANTS.api.movie}?offset=${offset}&limit=${limit}`, fetcher);
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

  const handleToggleFavorite = async (movie: IMovie | undefined) => {
    if (!movies || !movies.edges?.length || !movie) return;

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

    setMovies({ ...movies });
  };

  const handleMutateMovies = debounce(async () => {
    const newOffset = offset + limit;

    setOffset(newOffset);

    const newData = await fetcher(`${CONSTANTS.api.movie}?offset=${newOffset}&limit=${limit}`);

    mutate(newData);
  }, 1000);

  return (
    <Sidebar>
      <MoviesListing
        movies={movies}
        onMutateMovies={handleMutateMovies}
        favoriteButton={{ onClick: handleToggleFavorite }}
      />
    </Sidebar>
  );
}

const HOCMovies: any = WithPrivatePage(Movies);

HOCMovies.getLayout = function GetLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default HOCMovies;
