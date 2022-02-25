import { getSession } from "next-auth/client";
import Head from "next/head";
import FirstBanner from "../components/FirstBanner";
import Header from "../components/Header";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Dealers</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header />
        <FirstBanner />
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: { session },
  };
}
