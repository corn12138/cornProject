import React, { FC } from 'react';
import { css } from '@emotion/css';
import styles from './app.module.less'
import { BrowserRouter, useRoutes } from 'react-router-dom';
import { router } from './router';

const Routing = () => useRoutes(router);

const App: FC = () => {
  return <BrowserRouter>
    <Routing />
  </BrowserRouter>
}

export default App;