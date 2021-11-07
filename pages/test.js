import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import { db } from "./firebase";
import Post from "./components/Post";
import ComboBox from "./components/CimboBox";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";

function test() {
  const [posts, setPosts] = useState([]);
  const [type, setType] = useState("moto");
  const [ref, setRef] = useState(db.collection(type));
  const [make, setMake] = useState();
  const [model, setModel] = useState();
  const [open, setOpen] = React.useState(false);

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
  const handleChange = (event) => {
    setMake(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div className="bg-[#fafafa] h-screen">
      <Header />
      {/* <ComboBox /> */}
      <div>
        <Button sx={{ display: "block", mt: 2 }} onClick={handleOpen}>
          Open the select
        </Button>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-controlled-open-select-label">Age</InputLabel>
          <Select
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            value={make}
            label="Age"
            onChange={(e) => {
              const a = e.target.value;
              if (a != "") {
                setMake(a);
              }
              setRef(db.collection(type));
            }}
            onClick={() => {
              !make
                ? setRef(db.collection(type))
                : setRef(db.collection(type).where("make", "==", `${make}`));
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="Suzuki">Suzuki</MenuItem>
            <MenuItem value="Honda">Honda</MenuItem>
            <MenuItem value="Ducati">Ducati</MenuItem>
            <MenuItem value="KTM">KTM</MenuItem>
          </Select>
        </FormControl>
      </div>

      <div className="p-5">
        <select
          className="border border-gray-300 m-0.5 rounded-sm px-4 py-2 w-max hover:shadow active:scale-90 transition duration-150 bg-transparent text-sm hover:bg-[#f4f7f61a]"
          onChange={(e) => {
            const a = e.target.value;
            if (a != "") {
              setMake(a);
            }
            setRef(db.collection(type));
          }}
          onClick={() => {
            !make
              ? setRef(db.collection(type))
              : setRef(db.collection(type).where("make", "==", `${make}`));
          }}
        >
          <option value="">All</option>
          <option value="Suzuki">Suzuki</option>
          <option value="Honda">Honda</option>
          <option value="Ducati">Ducati</option>
          <option value="KTM">KTM</option>
        </select>
        {make ? (
          <select
            className="border border-gray-300 m-0.5 rounded-sm px-4 py-2 w-max hover:shadow active:scale-90 transition duration-150 bg-transparent text-sm hover:bg-[#f4f7f61a]"
            onChange={(e) => {
              const b = e.target.value;
              if (b != "") {
                setModel(b);
              }
              setRef(db.collection(type));
            }}
            onClick={() => {
              !model
                ? setRef(db.collection(type).where("make", "==", `${make}`))
                : setRef(db.collection(type).where("model", "==", `${model}`));
            }}
          >
            <option value="">All</option>
            <option value="GSXR1000">GSXR1000</option>
            <option value="123">123</option>
          </select>
        ) : (
          ""
        )}
      </div>

      <button
        className="bg-yellow-400 p-1 m-2 rounded-xs text-center items-center"
        onClick={() => setRef(db.collection(type).where("make", "==", make))}
      >
        set make
      </button>
      <button
        className="bg-lime-400 p-1 m-2 rounded-xs text-center items-center"
        onClick={() =>
          setRef(
            db.collection(type).orderBy("make").where("model", "==", "Panigale")
          )
        }
      >
        set model
      </button>
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
          cars
        </button>
        <button
          className="bg-lime-400 p-1 rounded-xs text-center items-center"
          onClick={() => setType("moto")}
        >
          moto
        </button>
      </div>
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
    </div>
  );
}
export default test;
