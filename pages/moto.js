import { useState } from "react";
import Header from "../components/Header";
import { db } from "/firebase";
import Post from "../components/Post";
import AddMoto from "../components/AddMoto";
import dataMoto from "./dataMoto.json";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useSession } from "next-auth/client";
import { makeStyles } from "@material-ui/styles";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { BiSearch } from "react-icons/bi";
import Button from "@mui/material/Button";

function New({ items }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [modelList, setModelList] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [session] = useSession();
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
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const makeFilter = (event) => {
    setMake(event.target.value);
    if (event.target.value == "All") setMake("");
    setModelList(dataMoto.find((x) => x.name === event.target.value).model) ||
      "";
    setModel("");
    setMinPrice("");
    setMaxPrice("");
  };

  const modelFilter = (e) => {
    setModel(e.target.value);
    if (e.target.value == "All") setModel("");
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

  const useStyles = makeStyles({
    customOutline: {
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "rgb()",
      },
      "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
        borderColor: "rgb(14 165 233)",
      },
      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "rgb(56 189 248)",
      },
      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
        color: "",
      },
      "& .MuiOutlinedInput-input": {
        color: "",
      },
      "& .MuiInputLabel-root": {
        color: "",
      },
      "& .MuiInputLabel-root.Mui-focused": {
        color: "rgb(14 165 233)",
      },
    },
  });
  const classes = useStyles();

  return (
    <div className="min-h-screen">
      <Header />
      <div className="flex justify-left pb-3 lg:pb-0 space-x-2 sticky top-12 z-50 max-w-7xl m-auto">
        <button
          onClick={handleClick}
          className="shadow-md hover:bg-gray-100 px-6 bg-[#ffffff] py-1 rounded-sm"
        >
          <BiSearch className="text-gray-900 h-5 w-5" />
        </button>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <Typography sx={{ p: 2 }}>
            {" "}
            <div className="flex justify-center ">
              <div className="m-1">
                <FormControl
                  size="small"
                  classes={{ root: classes.customOutline }}
                >
                  <InputLabel id="search-maker" className="text-gray-900">
                    Make
                  </InputLabel>
                  <Select
                    className="w-36 items-center"
                    labelId="search-make"
                    label="Make"
                    value={make}
                    onChange={makeFilter}
                    MenuProps={MenuProps}
                  >
                    {dataMoto.map((x, index) => (
                      <MenuItem key={index} value={x.name}>
                        {`${x.name}`}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className="m-1">
                <FormControl
                  size="small"
                  classes={{ root: classes.customOutline }}
                >
                  <InputLabel id="search-model" className="text-gray-900">
                    Model
                  </InputLabel>
                  <Select
                    className="w-36 items-center"
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
            </div>
            <div className="flex justify-center">
              <div className="m-1">
                <FormControl
                  size="small"
                  classes={{ root: classes.customOutline }}
                >
                  <InputLabel id="set-min-price" className="text-gray-900">
                    Min price
                  </InputLabel>
                  <Select
                    className="w-36 items-center"
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
              </div>
              <div className="m-1">
                <FormControl
                  size="small"
                  classes={{ root: classes.customOutline }}
                >
                  <InputLabel id="set-max-price" className="text-gray-900">
                    Max price
                  </InputLabel>
                  <Select
                    className="w-36 items-center"
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
          </Typography>
        </Popover>
        {session ? <AddMoto /> : ""}{" "}
      </div>
      <div className="grid md:flex justify-center">
        <div className="flex flex-col items-center ">
          {!make
            ? !minPrice
              ? items
                  .filter(
                    maxPrice
                      ? (x) => x.post.price <= maxPrice
                      : (x) => x.post.price <= Number.MAX_VALUE
                  )
                  .map(({ id, post }) => (
                    <Post
                      reference={id}
                      key={id.toString()}
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
                      description={post.description}
                    />
                  ))
              : items
                  .filter(
                    !maxPrice
                      ? (x) => x.post.price >= minPrice
                      : (x) =>
                          x.post.price >= minPrice && x.post.price <= maxPrice
                  )
                  .map(({ id, post }) => (
                    <Post
                      reference={id}
                      key={id.toString()}
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
                      description={post.description}
                    />
                  ))
            : items
                .filter(
                  !model
                    ? (x) => x.post.make == make
                    : (x) => x.post.make == make && x.post.model == model
                )
                .filter(
                  !maxPrice
                    ? (x) => x.post.price >= minPrice
                    : (x) =>
                        x.post.price >= minPrice && x.post.price <= maxPrice
                )
                .map(({ id, post }) => (
                  <Post
                    reference={id}
                    key={id.toString()}
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
                    description={post.description}
                  />
                ))}
        </div>
      </div>
    </div>
  );
}
export default New;

export async function getServerSideProps() {
  const data = await db.collection("moto").get();
  return {
    props: {
      items: data.docs.map((doc) => ({
        id: doc.id,
        post: doc.data(),
      })),
    },
  };
}
