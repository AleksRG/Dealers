import Head from "next/head";
import { useState, useEffect } from "react";
import Post from "./components/Post";
import { db } from "./firebase";
import { getSession, signIn, signOut, useSession } from "next-auth/client";
import { useRouter } from "next/dist/client/router";
import Header from "./components/Header";

export default function Home() {
  const router = useRouter();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() }))
        );
      });
  }, []);

  //SIGH IN FUNCTION
  const [session] = useSession();
  console.log(session);

  return (
    <div>
      <Head>
        <title>My project</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-[#fafafa] h-screen">
        <Header />
        <div className="flex justify-center">
          <div className="">
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
              " "
            )}

            <div className="flex flex-col items-center p-2">
              {posts.map(({ id, post }) => (
                <Post
                  key={id}
                  username={post.username}
                  make={post.make}
                  model={post.model}
                  price={post.price}
                  imageUrl={post.imageUrl}
                  imageUrl2={post.imageUrl2}
                  imageUrl3={post.imageUrl3}
                  imageUrl4={post.imageUrl4}
                />
              ))}
            </div>
          </div>
        </div>
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
