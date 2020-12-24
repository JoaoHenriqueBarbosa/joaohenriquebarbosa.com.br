import Page from '../components/Page';
import SEO from '../components/SEO';
import path from "path";
import fs from "fs";
import { connectToDatabase } from '../utils/mongodb';
import matter from 'gray-matter';

export default function Home({ config }) {
  return (
    <Page config={config}>
      <SEO
        siteTitle={config.title}
        description={config.description}
        image="/images/rocket.png"
        pathname={config.siteUrl}
        siteLanguage="pt-BR"
        siteLocale="BR"
        twitterUsername={config.twitter}
      />
      <div className="container">
        <div className="filename">welcome.txt</div>
        <div className="greetings-codeblock">
          <img className="image" src="/images/joaohome.jpg" width="160px" height="160px" />
          <div className="text">
            <h1>Olá, sou João Henrique</h1>
            <p>
              Sou <span className="pink">João Henrique Barbosa</span>, um desenvolvedor de software <span className="green">full-stack</span> com foco em <span className="yellow">JavaScript moderno</span>.
              Gosto de programar, aprender e escrever. Seja bem vinde ao meu site e <span className="blue">sinta-se a vontade</span>!
            </p>
          </div>
        </div>
      </div>
    </Page>
  );
}

export async function getStaticProps() {

  const siteData = await import(`../content/data/config.json`);

  const fsPromises = fs.promises;
  const directoryPath = path.join(process.cwd(), '/content/posts');
  const files = await fsPromises.readdir(directoryPath);

  const posts = await Promise.all(files.map(async (file) => {
    const content = await import(`../content/posts/${file}`);
    const postData = matter(content.default);

    postData.data.content = postData.content;

    return {
      slug: file.substr(0, file.length - 3),
      ...postData.data
    }
  }));

  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const { db, client } = await connectToDatabase();

  if (client.isConnected()) {

    const popular = await db
      .collection("pageviews")
      .find({})
      .sort({ total: -1 })
      .limit(parseInt(process.env.MAX_POPULAR_HOMEPAGE) || 3)
      .toArray();

    console.log(popular)

  }

  return {
    props: {
      config: siteData.default,
    },
  };
}
