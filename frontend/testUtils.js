import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from './src/store';

/**
 * Render method for testing
 */
const render = (children) => rtlRender(
  <Provider store={store}>
    {children}
  </Provider>
)

export { render };
export * from '@testing-library/react';