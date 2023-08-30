import { RouterProvider } from 'react-router-dom';
import router from './router';
import Header from './common/components/Header';
import { GlobalStyle } from './common/style/globalStyle';

export default function App() {
  return (
    <>
      <GlobalStyle />
      <Header />
      <RouterProvider router={router} />
    </>
  );
}
