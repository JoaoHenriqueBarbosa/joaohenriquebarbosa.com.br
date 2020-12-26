import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import path from "path";

export const Twitter = ({
  type = 'summary_large_image',
  username,
  title,
  desc,
  baseUrl,
  image,
}) => (
  <Head>
    {username && <meta name="twitter:creator" content={username} />}
    <meta name="twitter:card" content={type} />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={desc} />
    <meta name="twitter:image" content={path.join(baseUrl, image)} />
    <meta name="twitter:image:alt" content={desc} />
  </Head>
)

Twitter.propTypes = {
  type: PropTypes.string,
  username: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};