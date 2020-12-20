import matter from 'gray-matter';
import React from 'react';
import Page from '../components/Page';
import path from "path";
import fs from "fs";
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import { renderers } from '../utils/utils';

const Post = ({ title, content, data }) => {
  return (
    <Page
      siteTitle={title}
      pageTitle={data.title}
    >
      <article className="container">

        <div className="page">
          <ReactMarkdown escapeHtml={false} source={content} plugins={[gfm]} renderers={renderers} />
        </div>
      </article>
    </Page>
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
      title: siteData.default.title,
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