import React from 'react';
import Helmet from 'react-helmet';

export const WithHelmet = ({ children, ...helmetProps }) => {
  return (
    <Helmet {...helmetProps}>{children}</Helmet>
  )
};

export const withHelmet = helmetProps => BaseComponent => (
  <Helmet {...helmetProps}><BaseComponent /></Helmet>
);

export default WithHelmet;
