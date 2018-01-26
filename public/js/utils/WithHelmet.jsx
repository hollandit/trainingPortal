import React from 'react';
import Helmet from 'react-helmet';

export const WithHelmet = ({ children, ...helmetProps }) => {
  return (
    <React.Fragment>
      <Helmet>
        {helmetProps.title && (
          <title>{helmetProps.title}</title>
        )}
      </Helmet>

      {children}
    </React.Fragment>
  )
};

export const withHelmet = helmetProps => BaseComponent => props => (
  <WithHelmet {...helmetProps}><BaseComponent {...props} /></WithHelmet>
);

export default WithHelmet;
