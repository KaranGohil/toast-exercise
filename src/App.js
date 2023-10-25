import React from 'react';
import Container from '@mui/material/Container';

import Header from './Header';
import Content from './Content';
import Toast from './components/Toast';

function App() {
  return (
    <>
      <Header />
      <Container>
        <Content />
      </Container>
      <Toast/>
    </>
  );
}

export default App;
