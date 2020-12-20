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
      <footer className="footer container">
        <div>
          <strong>João Henrique Barbosa</strong> / <a href="https://twitter.com/codingjon" target="_blank" rel="noopener noreferrer">Twitter</a> /
        <a href="https://github.com/JoaoHenriqueBarbosa" target="_blank" rel="noopener noreferrer">GitHub</a> /
        <a href="https://github.com/JoaoHenriqueBarbosa/joaohenriquebarbosa.com.br" target="_blank" rel="noopener noreferrer">Código-fonte</a>
        </div>
      </footer>
    </>
  )
}

export default Page;