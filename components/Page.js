import React from 'react'
import NavBar from './NavBar';

const Page = ({ config, children }) => {
  return (
    <>
      <NavBar title={config.title} />
      <main id="main-content" className="container">
        {children}
      </main>
      <footer className="footer container">
        <div>
          <strong>{config.title}</strong> / <a href={`https://twitter.com/${config.twitter}`} target="_blank" rel="noopener noreferrer">Twitter</a> /{" "}
          <a href={config.gitHub} target="_blank" rel="noopener noreferrer">GitHub</a> /{" "}
          <a href={config.linkedIn} target="_blank" rel="noopener noreferrer">LinkedIn</a> /{" "}
          <a href={config.repo} target="_blank" rel="noopener noreferrer">Código-fonte</a>
        </div>
      </footer>
    </>
  )
}

export default Page;