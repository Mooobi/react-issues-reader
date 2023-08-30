import { createBrowserRouter } from 'react-router-dom';
import Main from './pages/main/Main';
import Detail from './pages/detail/Detail';
import { PATH_DETAIL, PATH_MAIN } from './common/constants/constants';
import NotFound from './pages/notFound/NotFound';

const router = createBrowserRouter([
  { path: PATH_MAIN, element: <Main /> },
  { path: PATH_DETAIL, element: <Detail /> },
  { path: '*', element: <NotFound /> },
]);

export default router;
