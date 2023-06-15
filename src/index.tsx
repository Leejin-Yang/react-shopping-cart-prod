import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';

import App from './pages';
import ProductsListPage from './pages/ProductsListPage';
import CartPage from './pages/CartPage';
import OrderListPage from './pages/OrderListPage';
import OrderDetailPage from './pages/OrderDetailPage';
import NotFoundPage from './pages/NotFoundPage';

import { worker } from './mocks/browser';
import GlobalStyle from './styles';
import theme from './styles/theme';
import { PATH } from './constants/path';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const main = async () => {
  if (window.location.pathname === '/react-shopping-cart-prod') {
    window.location.pathname = '/react-shopping-cart-prod/';
    return;
  }

  await worker.start({
    serviceWorker: {
      url: '/react-shopping-cart-prod/mockServiceWorker.js',
    },
  });
};

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      errorElement: <NotFoundPage />,
      children: [
        { path: PATH.product, element: <ProductsListPage /> },
        { path: PATH.cart, element: <CartPage /> },
        { path: PATH.order, element: <OrderListPage /> },
        { path: `${PATH.order}/:orderId`, element: <OrderDetailPage /> },
      ],
    },
  ],
  { basename: process.env.PUBLIC_URL }
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
});

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <RouterProvider router={router} />
        </ThemeProvider>
      </RecoilRoot>
    </QueryClientProvider>
  </StrictMode>
);

main();
