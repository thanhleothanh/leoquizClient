import React from 'react';
import { Helmet } from 'react-helmet';

const Meta = ({ title, description }) => {
  return (
    <Helmet>
      <title>Leo Quiz | {title}</title>
      <meta name='description' content={description} />
    </Helmet>
  );
};

export default Meta;
