import { useState } from "react";
import { storage, db } from "./firebase";
import firebase from "firebase";
import { useSession } from "next-auth/client";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { MdCameraAlt } from "react-icons/md";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import dataTest from "./dataTest.json";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";

function addproduct({ username }) {
  const [session, loading] = useSession();
  const [images, setImages] = useState([]);
  const [urls, setUrls] = useState([]);
  const [progress, setProgress] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [price, setPrice] = useState("");
  const [modelList, setModelList] = useState([]);
  const [kilometers, setKilometers] = useState("");
  const [year, setYear] = useState("");
  const [horsepower, setHorsepower] = useState("");

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
  const modelResult = (e) => {
    setMake(e.target.value);
    setModelList(dataTest.find((x) => x.name === e.target.value).model);
  };

  const today = new Date();
  const time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const handleChange = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      const newImage = e.target.files[i];
      /* newImage["id"] = Math.random(); */
      setImages((prevState) => [newImage, ...prevState]);
    }
  };

  const handleUpload = () => {
    const promises = [];
    images.map((image) => {
      const uploadTask = storage
        .ref(`/images/${image.name + session.user.name + time}`)
        .put(image);
      promises.push(uploadTask);
      uploadTask.on(
        "state_change",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
        },
        (error) => {
          console.log(error);
          alert(error.message);
        },

        async () => {
          await storage
            .ref("images")
            .child(image.name + session.user.name + time)
            .getDownloadURL()
            .then((url) => {
              setUrls((prevState) => [...prevState, url]);
            });
        }
      );
    });
    Promise.all(progress).catch((err) => console.log(err));
    setImages([]);
  };

  const postUpload = () => {
    db.collection("moto").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      make: make,
      model: model,
      price: price,
      imageUrl: urls[0],
      imageUrl2: urls[1],
      imageUrl3: urls[2],
      imageUrl4: urls[3],
      username: session.user.name,
      kilometers: kilometers,
      year: year,
      horsepower: horsepower,
    });
    setProgress(0);
    setMake("");
    setModel("");
    setPrice("");
    setImages([]);
    setKilometers("");
    setYear("");
    setHorsepower("");
  };

  const Input = styled("input")({
    display: "none",
  });

  return (
    <div className="flex flex-col w-[80%] p-4 m-auto mt-7 border rounded-lg border-gray-300">
      <div className="flex justify-between">
        <label htmlFor="icon-button-file" className="mr-8">
          <Input
            accept="image/*"
            id="icon-button-file"
            multiple
            type="file"
            onChange={handleChange}
            onClick={(e) => (e.target.value = null)}
          />
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
          >
            <MdCameraAlt className="text-blue-700" />
          </IconButton>
        </label>

        <div className="flex items-center justify-center">
          <CircularProgress variant="determinate" value={progress} />
          <Typography
            variant="caption"
            component="div"
            color="text.secondary"
            position="absolute"
          >
            {`${Math.round(progress)}%`}
          </Typography>
        </div>

        <button
          onClick={handleUpload}
          className="border border-gray-300 m-0.5 rounded-sm px-4 py-2 w-max hover:shadow active:scale-90 transition duration-150 bg-transparent text-sm hover:bg-[#f4f7f61a]"
        >
          Upload
        </button>
      </div>
      <div className="flex justify-between my-2 items-center">
        <FormControl className="w-48 m-1 bg-[#FFFFFF]">
          <InputLabel id="search-make">Make</InputLabel>
          <Select
            labelId="search-make"
            label="Make"
            value={make}
            onChange={modelResult}
            MenuProps={MenuProps}
          >
            {dataTest.map((x, index) => (
              <MenuItem key={index} value={x.name}>
                {`${x.name}`}{" "}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl className="w-48 m-1 bg-[#FFFFFF]">
          <InputLabel id="search-model">Model</InputLabel>
          <Select
            labelId="search-model"
            label="Model"
            value={model}
            /* onChange={modelFilter} */
            onChange={(event) => setModel(event.target.value)}
            MenuProps={MenuProps}
          >
            {modelList.map((x, index) => (
              <MenuItem key={index} value={x.name}>
                {`${x.name}`}{" "}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          className="w-48 m-1 bg-[#FFFFFF]"
          label="Price"
          id="Price"
          type="number"
          InputProps={{ inputProps: { min: 0 } }}
          onPaste={(e) => {
            e.preventDefault();
          }}
          onKeyDown={(e) =>
            ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
          }
          onChange={(event) => setPrice(event.target.value)}
          value={price}
        />
      </div>
      <div className="flex justify-between my-2 items-center">
        <TextField
          className="w-48 m-1 bg-[#FFFFFF]"
          label="Horsepower"
          id="Horsepower"
          type="number"
          InputProps={{ inputProps: { min: 0 } }}
          onPaste={(e) => {
            e.preventDefault();
          }}
          onKeyDown={(e) =>
            ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
          }
          onChange={(event) => setHorsepower(event.target.value)}
          value={horsepower}
        />

        <TextField
          className="w-48 m-1 bg-[#FFFFFF]"
          label="Year"
          id="Year"
          type="number"
          InputProps={{ inputProps: { min: 0 } }}
          onPaste={(e) => {
            e.preventDefault();
          }}
          onKeyDown={(e) =>
            ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
          }
          onChange={(event) => setYear(event.target.value)}
          value={year}
        />

        <TextField
          className="w-48 m-1 bg-[#FFFFFF]"
          label="Kilometers"
          id="Kilometers"
          type="number"
          InputProps={{ inputProps: { min: 0 } }}
          onPaste={(e) => {
            e.preventDefault();
          }}
          onKeyDown={(e) =>
            ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
          }
          onChange={(event) => setKilometers(event.target.value)}
          value={kilometers}
        />
      </div>

      <TextField
        id="outlined-multiline-static"
        label="Description"
        multiline
        rows={4}
        defaultValue="No description"
      />

      <div className="text-center">
        <button
          disabled={!urls[3]}
          className="border border-gray-300 m-0.5 rounded-sm px-4 py-2 w-max hover:shadow active:scale-90 transition duration-150 bg-transparent text-sm hover:bg-[#f4f7f61a]"
          onClick={postUpload}
        >
          Post product
        </button>
      </div>
      <div className="flex justify-center">
        {images.map((x) => (
          <img
            src={URL.createObjectURL(x)}
            width={100}
            height={100}
            objectFit="cover"
          ></img>
        ))}
      </div>
    </div>
  );
}

export default addproduct;
