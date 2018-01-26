import React from 'react';
import Helmet from 'react-helmet';

export const WithHelmet = ({ children, ...helmetProps }) => {
  return (
    <Helmet {...helmetProps}>{children}</Helmet>
  )
}
