import { useState, useEffect } from "react";
import Post from "./components/Post";
import { db } from "./firebase";
import Header from "./components/Header";

function moto() {
  const [x, setX] = useState("moto");
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    db.collection(`${x}`)
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() }))
        );
      });
  }, []);
  console.log(x);
  return (
    <div className="bg-[#fafafa] h-screen">
      <Header />
      {/* <button onClick={() => setX("posts")}>xxxzx</button> */}
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
  );
}

export default moto;
