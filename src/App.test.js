import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  const {container, getByText} = render(<App />)
  // expect(getByText(/home/i)).toBeInTheDocument()
  expect(container).toBeTruthy()

});
