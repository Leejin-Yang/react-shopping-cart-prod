import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import store from 'store';

import theme from 'styles/theme';
import GlobalStyle from 'styles/GlobalStyle';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story) => (
    <Provider store={store}>
      <MemoryRouter>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          {Story()}
        </ThemeProvider>
      </MemoryRouter>
    </Provider>
  ),
];
