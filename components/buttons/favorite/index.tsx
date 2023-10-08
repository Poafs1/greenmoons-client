import { Favorite } from '@mui/icons-material';
import { IMovie } from '../../../interfaces/movie';
import { FC } from 'react';
import { grey, red } from '@mui/material/colors';

export interface IFavoriteButton {
  movie?: IMovie;
  onClick: (movie: IMovie | undefined) => void;
}

const FavoriteButton: FC<IFavoriteButton> = ({ movie, onClick }) => {
  return (
    <Favorite
      sx={{ color: movie?.is_favorite ? red[400] : grey[400], width: '20px', height: '20px', cursor: 'pointer' }}
      onClick={() => onClick(movie)}
    />
  );
};

export default FavoriteButton;
