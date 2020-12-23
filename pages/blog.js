import React, { useEffect, useState } from 'react';
import Page from '../components/Page';
import SEO from '../components/SEO';
import path from "path";
import fs from "fs";
import awaitForEach from "await-foreach";
import matter from 'gray-matter';
import { toggleItem } from '../utils/utils';
import queryString from "query-string";
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';
import Image from 'next/image';
import Link from 'next/link';

const Blog = ({ config, categories, posts }) => {

  const [filterCategories, setFilterCategories] = useState([]);
  const [filteredPosts, setfilteredPosts] = useState(posts);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const params = queryString.parse(window.location.search);

    if (params.search) {
      setSearchText(params.search);
    }
  }, []);

  useEffect(() => {
    if (searchText !== "") {
      window.history.replaceState(null, null, `?search=${searchText}`);
    } else {
      window.history.replaceState(null, null, `/blog`);
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
              <Link key={"post-" + post.title} href={post.slug}>
                <a>
                  <div class="each">
                    <div class="gatsby-image-wrapper" style={{ "position": "relative", "overflow": "hidden", "display": "inline-block", "width": "150px", "height": "150px" }}>
                      <Image
                        src={post.thumbnail}
                        width="50px"
                        height="50px"
                        layout="responsive"
                      />
                    </div>
                    <div class="each-list-item">
                      <h2>{post.title}</h2>
                      <time class="excerpt">{format(new Date(post.date), "dd 'de' MMMM 'de' yyyy", { locale: pt })}</time>
                    </div>
                    {/* <div class="alert"><div class="new">New!</div></div> */}
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
  const posts = [];

  await awaitForEach(files, async (file) => {
    const content = await import(`../content/posts/${file}`);
    const postData = matter(content.default);

    await awaitForEach(postData.data.categories, async (cat) => {
      categories = categories.filter(f => f !== cat).concat([cat]);
    });

    if (postData.data.date) {
      postData.data.date = postData.data.date.toString();
    }

    postData.data.content = postData.content;

    posts.push({
      slug: file.substr(0, file.length - 3),
      ...postData.data
    });

  });

  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return {
    props: {
      config: siteData.default,
      categories,
      posts
    },
  };
}
