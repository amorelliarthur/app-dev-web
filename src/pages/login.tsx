import Logincontent from "@/components/LoginContent";
import Footer from "@/components/Footer";
import Menu from "@/components/Menu";
import Head from "next/head";

const Login = ():React.ReactElement => {
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
        <Logincontent />
        <Footer />
      </main>
    </>
  );
}

export default Login;