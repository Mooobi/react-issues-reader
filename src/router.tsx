import { createBrowserRouter } from 'react-router-dom';
import Main from './pages/main/Main';
import Detail from './pages/detail/Detail';
import { PATH_DETAIL, PATH_MAIN } from './common/constants/Path';

const router = createBrowserRouter([
  {
    path: PATH_MAIN,
    element: <Main />,
  },
  {
    path: PATH_DETAIL,
    element: <Detail />,
  },
]);

export default router;
