import matter from 'gray-matter';
import React from 'react';
import Page from '../components/Page';
import Podcast from '../components/Podcast';
import PodcastPlataforms from '../components/PodcastPlataforms';
import ReactMarkdown from "react-markdown";
import { renderers } from "../utils/utils";
import feed from "rss-to-json";
import SEO from '../components/SEO';

const Me = ({ config, podcastData, content, data }) => {

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
      config={config}
    >
      <SEO
        title={data.title}
        siteTitle={config.title}
        description={content.slice(0, 150) + "..."}
        image="/images/joao200.png"
        pathname={config.siteUrl}
        baseUrl={config.siteUrl}
        siteLanguage="pt-BR"
        siteLocale="BR"
        twitterUsername={config.twitter}
      />
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
  const postData = matter(content.default);
  delete postData.orig;

  const podcastData = await feed.load('https://anchor.fm/s/25239504/podcast/rss');

  return {
    props: {
      ...postData,
      podcastData,
      config: siteData.default
    },
  };
}
