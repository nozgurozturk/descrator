import React from 'react';
import { GeistProvider, CssBaseline } from '@geist-ui/react'
import Layout from './views/Layout'
function App() {
  return (
    <GeistProvider>
      <CssBaseline>
        <Layout />
      </CssBaseline>
    </GeistProvider>
  );
}

export default App;
