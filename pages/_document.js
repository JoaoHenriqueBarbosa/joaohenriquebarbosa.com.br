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
          <link rel="shortcut icon" type="image/png" href="/images/rocket.png" />
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