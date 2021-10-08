import Head from "next/head";
import { useState, useEffect } from "react";
import Post from "./components/Post";
import { db } from "./firebase";
import { getSession, signIn, signOut, useSession } from "next-auth/client";

import MultipleUpload from "./components/MultipleUpload";

export default function Home() {
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
  const [session, loading] = useSession();

  return (
    <div>
      <Head>
        <title>My project</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-[#fafafa] h-screen">
        <div className="flex justify-between bg-white object-contain p-3.5 border-b border-gray-300">
          <a className="text-2xl">Dealers</a>
          <div className="flex items-center">
            {session ? (
              <>
                <h2>Welcome {session.user.name}</h2>
                <button
                  className="px-2 py-2 border border-white rounded-full hover:shadow active:scale-90 transition duration-150 bg-transparent text-sm font-semibold hover:bg-[#f4f7f61a]"
                  onClick={signOut}
                >
                  Sign Out
                </button>
                <img
                  className="rounded-full h-10 cursor-pointer transition duration-150 transform hover:scale-110"
                  src={session.user.image}
                />
              </>
            ) : (
              <button onClick={signIn}>Sign In</button>
            )}
          </div>
        </div>
        {session ? <MultipleUpload username={session.user.name} /> : " "}

        <div className="flex flex-col items-center p-2">
          {posts.map(({ id, post }) => (
            <Post
              key={id}
              username={post.username}
              caption={post.caption}
              imageUrl={post.imageUrl}
              imageUrl2={post.imageUrl2}
              imageUrl3={post.imageUrl3}
              imageUrl4={post.imageUrl4}
            />
          ))}
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
