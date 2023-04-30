import React from 'react';
import css from './AppBar.module.css';
import Container from 'components/Container/Container';
import Navigation from 'components/Navigation/Navigation';
const AppBar = () => {
  return (
    <header className={css.header}>
      <Container>
        <Navigation />
      </Container>
    </header>
  );
};

export default AppBar;
