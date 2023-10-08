import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ListItems from './index';

const mockItems = [
  { label: 'Item 1', icon: <span>Icon 1</span>, onClick: jest.fn() },
  { label: 'Item 2', icon: <span>Icon 2</span>, href: '/item2' },
  { label: 'Item 3', icon: <span>Icon 3</span> },
];

describe('ListItems Component', () => {
  it('should render a list of items', () => {
    render(<ListItems items={mockItems} />);

    mockItems.forEach((item) => {
      const listItem = screen.getByText(item.label);

      expect(listItem).toBeInTheDocument();
    });
  });

  it('should handle onClick for clickable items', () => {
    render(<ListItems items={mockItems} />);

    const clickableItem = screen.getByText('Item 1');

    fireEvent.click(clickableItem);

    expect(mockItems[0].onClick).toHaveBeenCalled();
  });

  it('should render items without links', () => {
    render(<ListItems items={mockItems} />);

    const nonLinkItem = screen.getByText('Item 3');

    expect(nonLinkItem).not.toHaveAttribute('href');
  });
});
