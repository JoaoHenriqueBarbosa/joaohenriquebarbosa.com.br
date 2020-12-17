import Head from 'next/head';
import React from 'react'
import NavBar from './NavBar';

const Page = ({ siteTitle, pageTitle, children }) => {
  return (
    <>
      <Head>
        <title>{pageTitle ? pageTitle + " | " + siteTitle : siteTitle}</title>
      </Head>
      <NavBar title={siteTitle} />
      <main id="main-content" className="container">
        {children}
      </main>
    </>
  )
}

export default Page;