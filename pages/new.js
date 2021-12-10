import { useState, useEffect } from "react";
import Header from "./components/Header";
import { db } from "./firebase";
import Post from "./components/Post";
import dataTest from "./dataTest.json";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useRouter } from "next/router";

function New() {
  const [posts, setPosts] = useState([]);
  const [type, setType] = useState("moto");
  const [ref, setRef] = useState(
    db.collection(type) /* .orderBy("timestamp", "desc") */
  );
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [modelList, setModelList] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const router = useRouter();

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 15;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 192,
      },
    },
  };

  // GET POST FUNCTION
  function getPosts() {
    ref.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.docs.map((doc) => {
        items.push({ id: doc.id, post: doc.data() });
      });
      setPosts(items);
    });
  }
  getPosts();
  /*  useEffect(() => {
    getPosts();
  }); */

  const makeFilter = (event) => {
    setMake(event.target.value);
    setRef(db.collection(type).where("make", "==", `${event.target.value}`));
    setModelList(dataTest.find((x) => x.name === event.target.value).model);
    setModel("");
    setMinPrice("");
    setMaxPrice("");
  };

  const modelFilter = (e) => {
    setModel(e.target.value);
    setRef(db.collection(type).where("model", "==", `${e.target.value}`));
    setMinPrice("");
    setMaxPrice("");
  };
  const a = [
    500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 5500, 6000, 6500,
    7000, 7500, 8000, 8500, 9000, 9500, 10000, 10500, 11000, 11500, 12000,
    12500, 13000, 13500, 14000, 14500, 15000, 15500, 16000, 16500, 17000, 17500,
    18000, 18500, 19000, 19500, 20000, 20500, 21000, 21500, 22000, 22500, 23000,
    23500, 24000, 24500, 25000, 25500, 26000, 26500, 27000, 27500, 28000, 28500,
    29000, 29500, 30000, 30500, 31000, 31500, 32000, 32500, 33000, 33500, 34000,
    34500, 35000, 35500, 36000, 36500, 37000, 37500, 38000, 38500, 39000, 39500,
    40000, 45000, 50000, 55000, 60000, 65000, 70000, 75000, 80000, 85000, 90000,
    95000, 100000,
  ];

  const minPriceFilter = (e) => {
    setMinPrice(e.target.value);
    setMaxPrice("");
  };

  const maxPriceFilter = (e) => {
    setMaxPrice(e.target.value);
  };

  return (
    <div className="min-h-screen bg-[#f6f8fa]">
      <Header />
      <div className="grid md:flex justify-center">
        <div className="p-2">
          <div className="text-center flex md:grid justify-center">
            <FormControl className="m-1">
              <InputLabel id="search-maker">Make</InputLabel>
              <Select
                className="w-36 h-12 bg-[#FFFFFF] items-center"
                labelId="search-make"
                label="Make"
                value={make}
                onChange={makeFilter}
                MenuProps={MenuProps}
              >
                {dataTest.map((x, index) => (
                  <MenuItem key={index} value={x.name}>
                    {`${x.name}`}{" "}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl className="m-1">
              <InputLabel id="search-model">Model</InputLabel>
              <Select
                className="w-36 h-12 bg-[#FFFFFF] items-center"
                labelId="search-model"
                label="Model"
                value={model}
                onChange={modelFilter}
                MenuProps={MenuProps}
              >
                {modelList.map((x, index) => (
                  <MenuItem key={index} value={x.name}>
                    {`${x.name}`}{" "}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="text-center lg:grid">
            <FormControl className="m-1">
              <InputLabel id="set-min-price">Min price</InputLabel>
              <Select
                className="w-36 h-12 bg-[#FFFFFF] items-center"
                labelId="set-min-price"
                label="Min price"
                value={minPrice}
                onChange={minPriceFilter}
                MenuProps={MenuProps}
              >
                {a.map((x, index) => (
                  <MenuItem key={index} value={x}>
                    {`${x}`}{" "}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl className="m-1">
              <InputLabel id="set-max-price">Max price</InputLabel>
              <Select
                className="w-36 h-12 bg-[#FFFFFF] items-center"
                labelId="set-max-price"
                label="Max price"
                value={maxPrice}
                onChange={maxPriceFilter}
                MenuProps={MenuProps}
              >
                {a
                  .filter((x) => x > minPrice)
                  .map((x, index) => (
                    <MenuItem key={index} value={x}>
                      {`${x}`}{" "}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </div>
        </div>
        <div className="flex flex-col items-center p-2">
          {!minPrice
            ? posts
                .filter(
                  maxPrice
                    ? (x) => x.post.price <= maxPrice
                    : (x) => x.post.price <= Number.MAX_VALUE
                )
                .map(({ id, post }) => (
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
                    horsepower={post.horsepower}
                    year={post.year}
                    kilometers={post.kilometers}
                  />
                ))
            : posts
                .filter(
                  !maxPrice
                    ? (x) => x.post.price >= minPrice
                    : (x) =>
                        x.post.price >= minPrice && x.post.price <= maxPrice
                )
                .map(({ id, post }) => (
                  <Post
                    key={id}
                    id={id}
                    username={post.username}
                    make={post.make}
                    model={post.model}
                    price={post.price}
                    imageUrl={post.imageUrl}
                    imageUrl2={post.imageUrl2}
                    imageUrl3={post.imageUrl3}
                    imageUrl4={post.imageUrl4}
                    timestamp={post.timestamp}
                    horsepower={post.horsepower}
                    year={post.year}
                    kilometers={post.kilometers}
                  />
                ))}
        </div>
      </div>
    </div>
  );
}
export default New;
