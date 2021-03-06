import Image from "next/image";
import React from "react";
import { Prism } from "react-syntax-highlighter";
import dracula from "../styles/dracula";
import queryString from "query-string";

const codeRenderer = ({ language, value }) => {
  return (
    <div className="prism">
      <Prism showLineNumbers={true} language={language} style={dracula}>
        {value}
      </Prism>
    </div>
  );
};

export const flatten = (text, child) => {
  return typeof child === 'string'
    ? text + child
    : React.Children.toArray(child.props.children).reduce(flatten, text);
}

const headingRenderer = (props) => {

  const children = React.Children.toArray(props.children);
  const text = children.reduce(flatten, '');
  const slug = text.toLowerCase().replace(/\W/g, '-');

  const content = (
    <>
      <a href={`#${slug}`} aria-label={`${text} permalink`} className="anchor before"><svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fillRule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>
      {props.children}
    </>
  );
  return React.createElement('h' + props.level, { id: slug, style: { position: 'relative' } }, content);
}

const imageRenderer = (props) => {

  const { src } = props;
  let dimentions = {};

  if ((src.includes("height") || src.includes("width")) && src.includes("?")) {
    dimentions = queryString.parse(src.split("?")[1]);
  } else {
    const { children, node, ...rest } = props;
    return <img {...rest} />
  }

  return <Image {...dimentions} src={src} layout="responsive" />;
}

const paragraphRenderer = ({ children }) => {
  const hasImage = !!children.find(
    (child) => typeof child === 'object' && child.key && !!child.key.match(/image/g)
  )
  return hasImage ? children : <p>{children}</p>
}

export const renderers = {
  heading: headingRenderer,
  image: imageRenderer,
  code: codeRenderer,
  paragraph: paragraphRenderer
};

export const toggleItem = (arr, item) => arr.includes(item) ? arr.filter(i => i !== item) : [...arr, item];

export const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

export const slash = (url) => {
  return url.startsWith("/") ? url : `/${url}`;
} 