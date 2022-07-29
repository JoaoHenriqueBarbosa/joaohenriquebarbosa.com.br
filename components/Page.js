import React from 'react'
import NavBar from './NavBar';
import { useTranslation } from 'react-i18next';

const Page = ({ config, children }) => {
  const { t } = useTranslation();

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
          <a href={config.repo} target="_blank" rel="noopener noreferrer">{t("Código-fonte")}</a>
          <div className="credits">
            Design and original idea created by <a target="_blank" rel="noopener noreferrer" href="https://www.taniarascia.com/">Tania Rascia</a>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Page;