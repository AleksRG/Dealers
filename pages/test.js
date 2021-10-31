import React from "react";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import { db } from "./firebase";
import Post from "./components/Post";

function test() {
  const [posts, setPosts] = useState([]);
  const [type, setType] = useState("moto");
  /* const [loading, setLoading] = useState(false); */

  const ref = db.collection(type);

  // GER POST FUNCTION
  function getPosts() {
    ref.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.docs.map((doc) => {
        items.push({ id: doc.id, post: doc.data() });
      });
      setPosts(items);
    });
  }

  useEffect(() => {
    getPosts();
  });

  // DELETE POST FUNCTION
  function deletePost(post) {
    ref
      .doc(post.id)
      .delete()
      .catch((err) => {
        console.error(err);
      });
  }
  // EDIT POST FUNCTION
  function editPost(updatedPost) {
    ref
      .doc(updatedPost.id)
      .update(updatedPost)
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <div className="bg-[#fafafa] h-screen">
      <Header />
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
            timestamp={post.timestamp}
          />
        ))}
      </div>
      <div className="bg-gray-200 m-8 flex justify-between p-2  text-center items-center">
        <button
          className="bg-red-400 p-1 rounded-xs text-center items-center"
          onClick={() => deletePost(posts[1])}
        >
          delete
        </button>
        <button className="bg-blue-400 p-1 rounded-xs text-center items-center">
          edit
        </button>
        <button
          className="bg-yellow-400 p-1 rounded-xs text-center items-center"
          onClick={() => setType("posts")}
        >
          all products
        </button>
        <button
          className="bg-lime-400 p-1 rounded-xs text-center items-center"
          onClick={() => setType("moto")}
        >
          moto
        </button>
      </div>
    </div>
  );
}
export default test;
