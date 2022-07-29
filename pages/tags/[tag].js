import React, { useEffect, useState } from 'react';
import Page from '../../components/Page';
import SEO from '../../components/SEO';
import path from "path";
import fs from "fs";
import awaitForEach from "await-foreach";
import matter from 'gray-matter';
import { slash, toggleItem } from '../../utils/utils';
import queryString from "query-string";
import { differenceInDays, format } from 'date-fns';
import { pt } from 'date-fns/locale';
import Image from 'next/image';
import Link from 'next/link';

const Tags = ({ config, posts, tag, minToPopular, daysToRecent }) => {

  const [views, setViews] = useState([]);

  useEffect(() => {
    const params = queryString.parse(window.location.search);

    if (params.search) {
      setSearchText(params.search);
    }

    fetch("/api/page-popular")
      .then((resp) => resp.json())
      .then((resp) => setViews(resp));
  }, []);

  const getPopularBadge = (post) => {
    const v = views.find(v => v.slug === post.slug);

    if (!(differenceInDays(new Date(), new Date(post.date.split('-'))) < daysToRecent) && v) {
      if (v.total > minToPopular) {
        return <div className="alert"><div className="popular"><div>Popular</div></div></div>;
      }
    }
  }

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
      <div className="container">
        <h1>Posts com a tag: {tag}</h1>
        <div className="tag-label">
          <span className="tag-count">{posts.length}</span> post{posts.length > 1 ? "s" : ""} encontrados.
        </div>
        <section className="posts">
          {
            posts.map(post => (
              <Link key={"post-" + post.title} href={slash(post.slug)}>
                <a>
                  <div className="each">
                    <div className="next-image-wrapper" style={{ "position": "relative", "overflow": "hidden", "display": "inline-block", "width": "150px", "height": "150px" }}>
                      <Image
                        src={post.thumbnail}
                        width="50px"
                        height="50px"
                        layout="responsive"
                      />
                    </div>
                    <div className="each-list-item">
                      <h2>{post.title}</h2>
                      <time className="excerpt">{format(new Date(post.date.split('-')), "dd 'de' MMMM 'de' yyyy", { locale: pt })}</time>
                    </div>
                    {
                      differenceInDays(new Date(), new Date(post.date.split('-'))) < daysToRecent && (
                        <div className="alert"><div className="new"><div>Novo!</div></div></div>
                      )
                    }
                    {getPopularBadge(post)}
                  </div>
                </a>
              </Link>
            ))
          }
        </section>
      </div>
    </Page >
  )
}

export default Tags;

export async function getStaticPaths() {

  const fsPromises = fs.promises;
  const directoryPath = path.join(process.cwd(), '/content/posts');
  const files = await fsPromises.readdir(directoryPath);

  let tags = [];

  await awaitForEach(files, async (file) => {
    const content = await import(`../../content/posts/${file}`);
    const postData = matter(content.default);

    await awaitForEach(postData.data.tags, async (cat) => {
      tags = tags.filter(f => f !== cat).concat([cat]);
    });
  });

  const paths = await Promise.all(tags.map(async tag => ({ params: { tag } })));

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps(context) {

  const { tag } = context.params;

  const siteData = await import(`../../content/data/config_ptBR.json`);

  const fsPromises = fs.promises;
  const directoryPath = path.join(process.cwd(), '/content/posts');
  const files = await fsPromises.readdir(directoryPath);

  let categories = [];

  let posts = await Promise.all(files.map(async (file) => {
    const content = await import(`../../content/posts/${file}`);
    const postData = matter(content.default);

    await awaitForEach(postData.data.categories, async (cat) => {
      categories = categories.filter(f => f !== cat).concat([cat]);
    });

    postData.data.content = postData.content;

    return {
      slug: file.substr(0, file.length - 3),
      ...postData.data
    }
  }));

  posts = posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  posts = posts.filter(post => post.tags.includes(tag));

  return {
    props: {
      config: siteData.default,
      posts,
      tag,
      minToPopular: process.env.MIN_TO_POPULAR || 30,
      daysToRecent: process.env.DAYS_TO_RECENT || 30
    },
  };
}
