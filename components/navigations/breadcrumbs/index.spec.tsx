import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Breadcrumbs, { IBreadcrumbs } from './index';

const mockItems: IBreadcrumbs = {
  items: [
    { label: 'Home', href: '/' },
    { label: 'Category', href: '/category' },
    { label: 'Product', href: '/category/product' },
  ],
};

describe('Breadcrumbs Component', () => {
  it('should render breadcrumbs with links', () => {
    render(<Breadcrumbs items={mockItems.items} />);

    const homeLink = screen.getByText('Home');
    const categoryLink = screen.getByText('Category');
    const productText = screen.getByText('Product');

    expect(homeLink).toBeInTheDocument();
    expect(categoryLink).toBeInTheDocument();
    expect(productText).toBeInTheDocument();

    const links = screen.getAllByRole('link');

    expect(links).toHaveLength(2); // last one will be a Typography component
  });

  it('should render the last breadcrumb without a link', () => {
    render(<Breadcrumbs items={mockItems.items} />);
    const productText = screen.getByText('Product');

    const lastText = screen.getByText('Product');

    expect(lastText.tagName).toBe('P');
    expect(productText).toBeInTheDocument();
  });
});
