import matter from 'gray-matter';
import React from 'react';
import Page from '../components/Page';
import Podcast from '../components/Podcast';
import PodcastPlataforms from '../components/PodcastPlataforms';
import ReactMarkdown from "react-markdown";
import { renderers } from "../utils/utils";
import feed from "rss-to-json";

const Me = ({ title, podcastData, content, data }) => {

  const meRenderers = {
    ...renderers,
    blockquote: ({ node }) => {
      if (node.children[0].children[0].value === "bind-podcast") {
        return (
          <>
            <Podcast podcastData={podcastData} />
            <p>Você também pode ouvir em:</p>
            <PodcastPlataforms />
          </>
        )
      }
      return <blockquote dangerouslySetInnerHTML={{ __html: node.children[0].children[0].value.replace(/(?:\r\n|\r|\n)/g, '<br />') }} />
    }
  };

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
          <ReactMarkdown escapeHtml={false} source={content} renderers={meRenderers} />
        </div>
      </article>
    </Page>
  )
}

export default Me;

export async function getStaticProps() {

  const siteData = await import(`../content/data/config.json`);
  const content = await import(`../content/pages/me.md`);
  const data = matter(content.default);
  delete data.orig;

  const podcastData = await feed.load('https://anchor.fm/s/25239504/podcast/rss');

  return {
    props: {
      ...data,
      podcastData,
      title: siteData.default.title,
    },
  };
}