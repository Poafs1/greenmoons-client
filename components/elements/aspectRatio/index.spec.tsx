import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AspectRatio, { AspectRatioEnum } from './index';

describe('AspectRatio Component', () => {
  it('should render children with the specified aspect ratio', () => {
    const aspectRatio = AspectRatioEnum.ONE_TO_ONE;

    render(
      <AspectRatio ratio={aspectRatio}>
        <div data-testid='child'>Child Content</div>
      </AspectRatio>,
    );

    const aspectRatioBox = screen.getByTestId('aspect-ratio-box');
    const child = screen.getByTestId('child');

    expect(aspectRatioBox).toBeInTheDocument();
    expect(aspectRatioBox).toHaveStyle(`padding-top: ${aspectRatio}`);
    expect(child).toBeInTheDocument();
  });

  it('should render children with a different aspect ratio', () => {
    const aspectRatio = AspectRatioEnum.SIXTEEN_TO_NINE;

    render(
      <AspectRatio ratio={aspectRatio}>
        <div data-testid='child'>Child Content</div>
      </AspectRatio>,
    );

    const aspectRatioBox = screen.getByTestId('aspect-ratio-box');
    const child = screen.getByTestId('child');

    expect(aspectRatioBox).toBeInTheDocument();
    expect(aspectRatioBox).toHaveStyle(`padding-top: ${aspectRatio}`);
    expect(child).toBeInTheDocument();
  });
});
