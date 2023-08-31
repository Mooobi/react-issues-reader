import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router';
import router from './router.tsx';
import { GlobalStyle } from './common/style/globalStyle.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <GlobalStyle />
    <RouterProvider router={router} />
  </>,
);
