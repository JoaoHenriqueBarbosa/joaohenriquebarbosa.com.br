import Page from '../components/Page';
import SEO from '../components/SEO';
import styles from '../styles/Home.module.css';

export default function Home({ title, description, siteUrl, twitter }) {
  return (
    <Page siteTitle={title}>
      <SEO
        siteTitle={title}
        description={description}
        image="/images/rocket.png"
        pathname={siteUrl}
        siteLanguage="pt-BR"
        siteLocale="BR"
        twitterUsername={twitter}
      />
      <div className="container">
        <h1>Olá, sou João Henrique</h1>
        <p>
          Sou João Henrique Barbosa, um desenvolvedor de software full-stack com foco em JavaScript moderno.
          Gosto de programar, aprender e escrever. Seja bem vinde ao meu site e sinta-se a vontade!
        </p>
      </div>
    </Page>
  );
}

export async function getStaticProps() {
  const siteData = await import(`../content/data/config.json`);

  return {
    props: {
      title: siteData.default.title,
      description: siteData.default.description,
      siteUrl: siteData.default.siteUrl,
      twitter: siteData.default.twitter,
    },
  };
}
