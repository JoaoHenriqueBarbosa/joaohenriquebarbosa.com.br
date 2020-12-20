import Page from '../components/Page';
import styles from '../styles/Home.module.css';

export default function Home({ title }) {
  return (
    <Page siteTitle={title}>
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
    },
  };
}
