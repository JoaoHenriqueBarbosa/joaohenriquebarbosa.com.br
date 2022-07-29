import React from 'react';
import Newsletter from '../components/Newsletter';
import Page from '../components/Page';
import SEO from '../components/SEO';

const Contact = ({ config }) => {

  return (
    <Page
      config={config}
    >
      <SEO
        title="Artigos"
        siteTitle={config.title}
        description={config.description}
        image="/images/joaofull.png"
        pathname={config.siteUrl}
        baseUrl={config.siteUrl}
        siteLanguage="pt-BR"
        siteLocale="BR"
        twitterUsername={config.twitter}
      />
      <div className="page container">
        <div>
          <h1>Contato</h1>
          <p>Vamos manter contato!</p>
          <Newsletter />
          <h2>Pela web</h2>
          <ul>
            <li>Email: <a href="mailto:joaohenriquebarbosa21@gmail.com">joaohenriquebarbosa21@gmail.com</a></li>
            <li>GitHub: <a href="https://github.com/JoaoHenriqueBarbosa">JoaoHenriqueBarbosa</a></li>
            <li>Twitter: <a href="https://twitter.com/codingjon">codingjon</a></li>
            <li>LinkedIn: <a href="https://www.linkedin.com/in/jo%C3%A3o-henrique-barbosa-ba1322124/">João Henrique Barbosa</a></li>
          </ul>
        </div>
      </div>
    </Page>
  )
}

export default Contact;

export async function getStaticProps() {

  const siteData = await import(`../content/data/config_ptBR.json`);

  return {
    props: {
      config: siteData.default,
      revalidate: 10
    },
  };
}
