import Header from "./components/Header";
import Results from "./components/Results";

function moto() {
<<<<<<< HEAD
  return (
    <div className="bg-[#fafafa] h-screen">
      <Header />
      <Results type={"moto"} />;
=======
  const [posts, setPosts] = useState([]);
  const ref = db.collection("moto").orderBy("timestamp", "desc");

  useEffect(() => {
    ref.onSnapshot((snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() })));
    });
  }, []);

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
            timestamp={post.timestamp}
          />
        ))}
      </div>
>>>>>>> 85410a4120116dc85078012b82202944d15a061c
    </div>
  );
}

export default moto;
