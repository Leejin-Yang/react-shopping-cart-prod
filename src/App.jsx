import { Route, Routes } from 'react-router-dom';

import { isLoggedInSelector } from 'store/selector';

import useReduxState from 'hooks/useReduxState';

import { COMMON_PAGES, NON_USER_PAGES, USER_PAGES } from 'pages';

import ProtectedRoute from 'components/route/ProtectedRoute';
import PageTemplate from 'components/template/PageTemplate/PageTemplate';

function App() {
  const [isLoggedIn] = useReduxState(isLoggedInSelector);

  return (
    <Routes>
      <Route element={<PageTemplate />}>
        {COMMON_PAGES.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}

        <Route element={<ProtectedRoute condition={isLoggedIn} />}>
          {USER_PAGES.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Route>
        <Route element={<ProtectedRoute condition={!isLoggedIn} />}>
          {NON_USER_PAGES.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Route>
      </Route>
    </Routes>
  );
}

export default App;