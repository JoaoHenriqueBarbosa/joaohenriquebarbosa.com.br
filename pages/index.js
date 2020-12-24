import { useRef } from 'react';
import Page from '../components/Page';
import SEO from '../components/SEO';
import path from "path";
import fs from "fs";
import { connectToDatabase } from '../utils/mongodb';
import matter from 'gray-matter';
import Link from 'next/link';
import Image from 'next/image';
import { slash } from '../utils/utils';
import { differenceInDays } from 'date-fns';
import Newsletter from '../components/Newsletter';

export default function Home({ config, posts, maxPopularHomepage, maxRecentHomepage, daysToRecent, openSourceProjects }) {

  const recent = useRef([...posts].slice(0, maxRecentHomepage));
  const popular = useRef([...posts].sort((a, b) => b.views - a.views).slice(0, maxPopularHomepage));

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
      <div className="container front-page">
        <section className="greeting">
          <div className="filename">welcome.txt</div>
          <div className="greetings-codeblock">
            <div className="top">
              <img className="image" src="/images/joaohome.jpg" width="160px" height="160px" />
              <div className="text">
                <h1>Olá, sou João Henrique</h1>
                <p>
                  Sou <span className="pink">João Henrique Barbosa</span>, um desenvolvedor de software <span className="green">full-stack</span> com foco em <span className="yellow">JavaScript moderno</span>.
                Gosto de programar, aprender e escrever. Seja bem vinde ao meu site e <span className="blue">sinta-se a vontade</span>!
              </p>
              </div>
            </div>
            <div className="bottom text">
              <Link href="/me">
                <a>
                  <button className="pink link">Sobre mim</button>
                </a>
              </Link>
              <Link href="/contact">
                <a>
                  <button className="yellow link">Newsletter</button>
                </a>
              </Link>
              <Link href={config.gitHub}>
                <a target="_blank" rel="noopener noreferrer">
                  <button className="green link">GitHub</button>
                </a>
              </Link>
              {/* <Link href={`https://twitter.com/intent/follow?ref_src=twsrc%5Etfw&region=follow_link&screen_name=${config.twitter}&tw_p=followbutton`}>
              <a target="_blank" rel="noopener noreferrer">
                <button className="blue link">Twitter</button>
              </a>
            </Link> */}
            </div>
          </div>
        </section>
        <section className="section">
          <h2>Últimos artigos<Link href="/blog"><a className="view-all">Ver todos</a></Link></h2>
          <div className="posts simple">
            {
              recent.current.map(post => (
                <Link href={slash(post.slug)} key={"recent-" + post.slug}>
                  <a>
                    <div className="each">
                      <div className="next-image-wrapper" style={{ "position": "relative", "overflow": "hidden", "display": "inline-block", "width": "150px", "height": "150px" }}>
                        <Image src={post.thumbnail} width="30px" height="30px" layout="fixed" />
                      </div>
                      <div className="each-list-item"><h2>{post.title}</h2></div>
                      {
                        differenceInDays(new Date(), new Date(post.date.split('-'))) < daysToRecent && (
                          <div className="alert"><div className="new"><div>Novo!</div></div></div>
                        )
                      }
                    </div>
                  </a>
                </Link>
              ))
            }
          </div>
        </section>
        <section className="section">
          <h2>Mais populares<Link href="/blog"><a className="view-all">Ver todos</a></Link></h2>
          <div className="posts simple">
            {
              popular.current.map(post => (
                <Link href={slash(post.slug)} key={"popular-" + post.slug}>
                  <a>
                    <div className="each">
                      <div className="next-image-wrapper" style={{ "position": "relative", "overflow": "hidden", "display": "inline-block", "width": "150px", "height": "150px" }}>
                        <Image src={post.thumbnail} width="30px" height="30px" layout="fixed" />
                      </div>
                      <div className="each-list-item"><h2>{post.title}</h2></div>
                      {
                        differenceInDays(new Date(), new Date(post.date.split('-'))) < daysToRecent && (
                          <div className="alert"><div className="new"><div>Novo!</div></div></div>
                        )
                      }
                    </div>
                  </a>
                </Link>
              ))
            }
          </div>
        </section>
        <section className="section">
          <h2>Projetos Open Source</h2>
          <div className="projects">
            {
              openSourceProjects.map(proj => (
                <div className="project">
                  <div>
                    <a href={proj.link} target="_blank" rel="noreferrer">
                      <div className="icon">{proj.icon}</div>
                      <h3>{proj.title}</h3>
                    </a>
                    <div className="description">{proj.description}</div>
                  </div>
                  <div className="flex"><a className="button" href={proj.repo} target="_blank" rel="noreferrer">Código-fonte</a></div>
                </div>
              ))
            }
          </div>
        </section>
        <section className="section">
          <Newsletter />
        </section>
      </div>
    </Page>
  );
}

export async function getStaticProps() {

  const siteData = await import(`../content/data/config.json`);
  const openSourceProjects = await import(`../content/data/openSourceProjects.json`);

  const fsPromises = fs.promises;
  const directoryPath = path.join(process.cwd(), '/content/posts');
  const files = await fsPromises.readdir(directoryPath);
  const { db, client } = await connectToDatabase();

  let views = [];

  if (client.isConnected()) {
    views = await db
      .collection("pageviews")
      .find({})
      .toArray();
  }

  const posts = await Promise.all(files.map(async (file) => {
    const content = await import(`../content/posts/${file}`);
    const postData = matter(content.default);
    const slug = file.substr(0, file.length - 3);

    const v = views.find(v => v.slug === slug);

    if (v) {
      postData.data.views = v.total;
    }

    return {
      slug,
      ...postData.data
    }
  }));

  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return {
    props: {
      config: siteData.default,
      openSourceProjects: openSourceProjects.default,
      posts,
      maxPopularHomepage: process.env.MAX_POPULAR_HOMEPAGE || 3,
      maxRecentHomepage: process.env.MAX_RECENT_HOMEPAGE || 3,
      daysToRecent: process.env.DAYS_TO_RECENT || 30
    },
    revalidate: 10
  };
}
