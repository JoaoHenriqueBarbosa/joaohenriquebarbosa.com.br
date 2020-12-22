import matter from 'gray-matter';
import React from 'react';
import Page from '../components/Page';
import path from "path";
import fs from "fs";
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import { renderers } from '../utils/utils';
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';
import { capitalize } from 'lodash';
import Image from 'next/image';
import SEO from '../components/SEO';

const Post = ({ title, slug, gitHub, siteUrl, twitter, author, content, data }) => {
  return (
    <Page
      siteTitle={title}
    >
      <SEO
        title={data.title}
        siteTitle={title}
        description={content.slice(0, 150) + "..."}
        image={data.thumbnail}
        pathname={siteUrl}
        siteLanguage="pt-BR"
        siteLocale="BR"
        twitterUsername={twitter}
        pathname={path.join(siteUrl, slug)}
        author={author}
        article={true}
        publishedDate={data.date}
        modifiedDate={data.date}
      />
      <div className="page">
        <article className="single container">
          <header className="single-header">
            <div className="gatsby-image-wrapper" style={{ position: "relative", overflow: "hidden", display: "inline-block", width: 150, height: 150 }}>
              <Image width="150" height="150" layout="responsive" src={data.thumbnail} />
            </div>
            <div className="flex">
              <h1>{data.title}</h1>
              <div className="post-meta">
                <time className="date">{capitalize(format(new Date(data.date), "EEEE, dd 'de' MMMM 'de' yyyy", { locale: pt }))}</time>/
                <a
                  style={{ borderBottom: "none" }}
                  className="twitter-link"
                  href={`http://twitter.com/share?text=${encodeURI(`${data.title} ${siteUrl}/${slug} via @${twitter}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Compartilhar
                </a> /
                <a className="github-link" style={{ borderBottom: "none" }} href={`${gitHub}/joaohenriquebarbosa.com.br/blob/master/content/posts/${slug}.md`} target="_blank" rel="noopener noreferrer">
                  Edite ✏️
                </a>
              </div>
              <div className="tag-container">
                {
                  data.tags.map(tag => (
                    <a key={`tag-${tag}`} style={{ borderBottom: "none", background: "none !important" }} href={`/tags/${tag}/`}><span>{tag}</span></a>
                  ))
                }
              </div>
            </div>
          </header>

          <div className="post">
            <ReactMarkdown escapeHtml={false} source={content} plugins={[gfm]} renderers={renderers} />
          </div>
        </article >
      </div >
    </Page >
  )
}

export default Post;

export async function getStaticProps(context) {
  const { slug } = context.params;

  const siteData = await import(`../content/data/config.json`);
  const content = await import(`../content/posts/${slug}.md`);
  const data = matter(content.default);
  delete data.orig;

  if (data.data.date) {
    data.data.date = data.data.date.toString();
  }

  return {
    props: {
      ...data,
      slug,
      title: siteData.default.title,
      gitHub: siteData.default.gitHub,
      siteUrl: siteData.default.siteUrl,
      twitter: siteData.default.twitter,
      author: siteData.default.author,
    }
  };
};


export async function getStaticPaths() {

  const fsPromises = fs.promises;

  const directoryPath = path.join(process.cwd(), '/content/posts');

  const files = await fsPromises.readdir(directoryPath);

  const paths = [];

  files.forEach((file) => {
    if (file.endsWith(".md")) {
      paths.push({
        params: { slug: file.substr(0, file.length - 3) }
      });
    }
  });

  return {
    paths,
    fallback: false
  };
}