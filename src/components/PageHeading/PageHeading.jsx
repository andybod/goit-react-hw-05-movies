import React from 'react';
import css from './PageHeading.module.css';
const PageHeading = ({ text }) => {
  return <h1 className={css.title}>{text}</h1>;
};

export default PageHeading;
