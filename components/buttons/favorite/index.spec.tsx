import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FavoriteButton from './index';
import { grey, red } from '@mui/material/colors';

describe('FavoriteButton Component', () => {
  it('should render FavoriteButton with default styling', () => {
    const onClickMock = jest.fn();

    render(<FavoriteButton onClick={onClickMock} />);

    const favoriteIcon = screen.getByTestId('favorite-button');

    expect(favoriteIcon).toBeInTheDocument();
    expect(favoriteIcon).toHaveStyle(`color: ${grey[400]}`);
    expect(favoriteIcon).toHaveStyle('width: 20px');
    expect(favoriteIcon).toHaveStyle('height: 20px');
    expect(favoriteIcon).toHaveStyle('cursor: pointer');
  });

  it('should render FavoriteButton with red color when movie is marked as favorite', () => {
    const onClickMock = jest.fn();
    const movie: any = { id: 1, title: 'Test Movie', is_favorite: true };

    render(<FavoriteButton movie={movie} onClick={onClickMock} />);

    const favoriteIcon = screen.getByTestId('favorite-button');

    expect(favoriteIcon).toBeInTheDocument();
    expect(favoriteIcon).toHaveStyle(`color: ${red[400]}`);
  });

  it('should call onClick handler when clicked', () => {
    const onClickMock = jest.fn();
    const movie: any = { id: 1, title: 'Test Movie', is_favorite: false };

    render(<FavoriteButton movie={movie} onClick={onClickMock} />);

    const favoriteIcon = screen.getByTestId('favorite-button');

    fireEvent.click(favoriteIcon);

    expect(onClickMock).toHaveBeenCalledWith(movie);
  });
});
