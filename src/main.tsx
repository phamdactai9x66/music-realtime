import { CssBaseline } from '@mui/material';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './App.tsx';
import './index.css';
import './service/firebase.ts';
import { store } from './store/configureStore';

const callBack = () => {
  return createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
      <CssBaseline />
      <App />
    </Provider>,
  );
};

callBack();
