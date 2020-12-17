import matter from 'gray-matter';
import React from 'react'
import ReactMarkdown from 'react-markdown';
import Page from '../components/Page';

const Me = ({ title, content, data }) => {
  return (
    <Page
      siteTitle={title}
      pageTitle={data.title}
    >
      <article className="container">
        <header className="page-header">
          <h1>{data.title}</h1>
        </header>
        <div className="page">
          <ReactMarkdown escapeHtml={false} source={content} />
        </div>
      </article>
    </Page>
  )
}

export default Me;

export async function getStaticProps() {

  const siteData = await import(`../data/config.json`);
  const content = await import(`../content/pages/me.md`);
  const data = matter(content.default);

  delete data.orig;

  return {
    props: {
      ...data,
      title: siteData.default.title,
    },
  };
}
