import React, { useEffect, useState } from 'react';
import Page from '../components/Page';
import SEO from '../components/SEO';
import path from "path";
import fs from "fs";
import awaitForEach from "await-foreach";
import matter from 'gray-matter';
import { slash, toggleItem } from '../utils/utils';
import queryString from "query-string";
import { differenceInDays, format, isSameMonth } from 'date-fns';
import { useRouter } from 'next/router';
import { pt } from 'date-fns/locale';
import Image from 'next/image';
import Link from 'next/link';

const Blog = ({ config, categories, posts, minToPopular, daysToRecent }) => {

  const router = useRouter();

  const [filterCategories, setFilterCategories] = useState([]);
  const [filteredPosts, setfilteredPosts] = useState(posts);
  const [searchText, setSearchText] = useState("");
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

  useEffect(() => {
    if (searchText !== "") {
      router.replace(`?search=${searchText}`, undefined, { shallow: true });
    } else {
      router.replace(`/blog`, undefined, { shallow: true });
    }
  }, [searchText]);

  const searchChange = (ev) => {
    setSearchText(ev.target.value);
  }

  const categoriesChange = (cat) => {
    const cats = toggleItem(filterCategories, cat);
    setFilterCategories(cats);
    if (cats.length) {
      setfilteredPosts(posts.filter(post => (
        post.categories.some(c => cats.includes(c))
      )));
    } else {
      setfilteredPosts(posts);
    }
  }

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
        baseUrl={config.siteUrl}
        pathname={config.siteUrl}
        siteLanguage="pt-BR"
        siteLocale="BR"
        twitterUsername={config.twitter}
      />
      <div className="container">
        <h1>Artigos</h1>
        <div className="category-container">
          {
            categories.map(cat => (
              <div
                key={"cat-" + cat}
                className={`category-filter ${filterCategories.includes(cat) ? "active" : ""}`}
                onClick={() => categoriesChange(cat)}
              >
                {cat}
              </div>
            ))
          }
        </div>
        <div className="search-container">
          <input type="text" className="search" value={searchText} onChange={searchChange} placeholder="Escreva sua busca..." type="search" />
          <div className="filter-count">{
            filteredPosts.filter(post => (
              post.content.includes(searchText) ||
              post.title.includes(searchText) ||
              post.tags.join(" ").includes(searchText)
            )).length
          }</div>
        </div>
        <section className="posts">
          {
            filteredPosts.filter(post => (
              post.content.includes(searchText) ||
              post.title.includes(searchText) ||
              post.tags.join(" ").includes(searchText)
            )).map(post => (
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

export default Blog;

export async function getStaticProps() {

  const siteData = await import(`../content/data/config.json`);

  const fsPromises = fs.promises;
  const directoryPath = path.join(process.cwd(), '/content/posts');
  const files = await fsPromises.readdir(directoryPath);

  let categories = [];

  let posts = await Promise.all(files.map(async (file) => {
    const content = await import(`../content/posts/${file}`);
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

  return {
    props: {
      config: siteData.default,
      categories,
      posts,
      minToPopular: process.env.MIN_TO_POPULAR || 30,
      daysToRecent: process.env.DAYS_TO_RECENT || 30
    },
  };
}
