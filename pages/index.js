import { getSession, useSession } from "next-auth/client";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import FirstBanner from "./components/FirstBanner";
import Header from "./components/Header";

export default function Home() {
  const router = useRouter();
  const [session] = useSession();

  return (
    <div>
      <Head>
        <title>My project</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-[#ffffff] ">
        <Header />
        {/*  <div className="flex justify-center ">
          {session ? (
            <div className="text-center mt-2">
              <button
                className="border border-gray-300 m-0.5 rounded-sm px-4 py-2 w-max hover:shadow active:scale-90 transition duration-150 bg-transparent text-sm hover:bg-[#f4f7f61a]"
                onClick={() => router.push("/addproduct")}
              >
                Add product
              </button>
            </div>
          ) : (
            ""
          )}
        </div> */}
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
