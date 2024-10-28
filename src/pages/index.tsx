import Head from "next/head";
import Menu from "@/components/Menu";
import HomeTop from "@/components/HomeTop";
import Footer from "@/components/Footer";

const Home = ():React.ReactElement => {
  return (
    <>
      <Head>
        <title>App Dev Web</title>
        <meta name="description" content="Processo seletivo – SWA – Desenvolvimento Web Fullstack" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Menu />
        <HomeTop />
        <Footer />
      </main>
    </>
  );
}

export default Home;
