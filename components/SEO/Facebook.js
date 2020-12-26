import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import path from "path";

export const Facebook = ({
  url,
  baseUrl,
  type,
  title,
  desc,
  image,
  locale,
}) => (
  <Head>
    <meta property="og:locale" content={locale} />
    <meta property="og:url" content={url} />
    <meta property="og:type" content={type} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={desc} />
    <meta property="og:image" content={path.join(baseUrl, image)} />
    <meta property="og:image:alt" content={desc} />
  </Head>
);

Facebook.propTypes = {
  url: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  locale: PropTypes.string.isRequired,
};