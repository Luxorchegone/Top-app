import { AppProps } from "next/app";
import Head from "next/head";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <Head>
        <title>My-top – рейтинг онлайн курсов!</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
