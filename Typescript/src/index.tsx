import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';

import registerServiceWorker from './registerServiceWorker';
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <App />
);
registerServiceWorker();
