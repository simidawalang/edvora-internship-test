import Layout from "../components/Layout";
import Navigation from "../components/Navigation";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navigation />
      <Layout>
      <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
