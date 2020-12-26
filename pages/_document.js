import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    const siteData = await import(`../content/data/config.json`);

    return { ...initialProps, ...siteData.default }
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="apple-touch-icon" sizes="152x152" href="/meta/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/meta/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/meta/favicon-16x16.png" />
          <link rel="manifest" href="/meta/site.webmanifest" />
          <link rel="mask-icon" href="/meta/safari-pinned-tab.svg" color="#5bbad5" />
          <meta name="msapplication-TileColor" content="#2b5797" />
          <meta name="theme-color" content="#ffffff" />
          {/* <link rel="shortcut icon" type="image/png" href={`${this.props.siteUrl}/images/rocket.png`} /> */}
          {/* <meta name="description" content={this.props.description} />
          <meta name="image" content="/images/rocket.png" />
          <meta property="og:url" content="https://www.joaohenriquebarbosa.com.br" />
          <meta property="og:title" content={this.props.title} />
          <meta property="og:description" content={this.props.description} />
          <meta property="og:image" content="/images/rocket.png" />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:title" content={this.props.title} />
          <meta name="twitter:description" content={this.props.description} />
          <meta name="twitter:image" content="/images/rocket.png" /> */}
        </Head>
        <body className="theme">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument