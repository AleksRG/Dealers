import { useState, useEffect } from "react";
import Post from "./Post";
import { db } from "../firebase";

function Results({ type }) {
  const [posts, setPosts] = useState([]);
  console.log(posts);
  useEffect(() => {
    db.collection(`${type}`)
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() }))
        );
      });
  }, []);

  return (
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
  );
}

export default Results;
