import React from 'react';
import { render } from '@testing-library/react';
import Admin from './admin';

test('renders learn react link', () => {
  const { getByText } = render(<Admin />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
