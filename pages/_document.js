import Document, { Head, Main, NextScript } from "next/document";
import { extractCritical } from "emotion-server";
import { hydrate } from "react-emotion";

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const page = renderPage();
    const styles = extractCritical(page.html);
    return { ...page, ...styles };
  }

  constructor(props) {
    super(props);
    const { __NEXT_DATA__, ids } = props;
    if (ids) {
      __NEXT_DATA__.ids = ids;
    }
  }

  componentWillMount() {
    // Adds server generated styles to emotion cache.
    // '__NEXT_DATA__.ids' is set in '_document.js'
    if (typeof window !== "undefined") {
      hydrate(window.__NEXT_DATA__.ids);
    }
  }

  render() {
    return (
      <html>
        <Head>
          <title>With Emotion</title>
          <style dangerouslySetInnerHTML={{ __html: this.props.css }} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
