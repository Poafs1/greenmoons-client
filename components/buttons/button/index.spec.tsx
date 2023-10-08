import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from './index';

describe('Button Component', () => {
  it('should render Button with label', () => {
    render(<Button label='test-label' />);

    const label = screen.getByText('test-label');

    expect(label).toBeInTheDocument();
  });

  it('should render a disabled Button', () => {
    render(<Button label='Disabled Button' disabled />);

    const button = screen.getByText('Disabled Button');

    expect(button).toBeDisabled();
  });

  it('should call onClick handler when clicked', () => {
    const onClickMock = jest.fn();

    render(<Button label='Click Me' onClick={onClickMock} />);

    const button = screen.getByText('Click Me');

    fireEvent.click(button);

    expect(onClickMock).toHaveBeenCalled();
  });

  it('should render a button with startIcon and endIcon', () => {
    render(<Button label='Icon Button' startIcon={<span>Start</span>} endIcon={<span>End</span>} />);

    expect(screen.getByText('Start')).toBeInTheDocument();

    expect(screen.getByText('End')).toBeInTheDocument();
  });

  it('should render a button with specified variant', () => {
    render(<Button label='Text Button' variant='text' />);

    const button = screen.getByText('Text Button');

    expect(button).toHaveStyle('color: white');
  });

  it('should render a button with specified size', () => {
    render(<Button label='Small Button' size='small' />);

    const button = screen.getByText('Small Button');

    expect(button).toHaveClass('MuiButton-sizeSmall');
  });

  it('should render a button with an href', () => {
    render(<Button label='Link Button' href='https://example.com' />);

    const linkButton = screen.getByText('Link Button');

    expect(linkButton).toHaveAttribute('href', 'https://example.com');
  });
});
