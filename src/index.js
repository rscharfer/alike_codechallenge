import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { Global, css } from '@emotion/core'

ReactDOM.render(
  <React.StrictMode>
    <Global
          styles={css`
            body {
              margin: 0;
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
                'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
                sans-serif;
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
            }
          `}
        />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

