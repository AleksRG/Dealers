import { useState } from "react";
import Image from "next/image";
import { storage, db } from "/firebase";
import { useSession } from "next-auth/client";
import { styled } from "@mui/material/styles";
import { MdCameraAlt } from "react-icons/md";
import { AiOutlinePlusCircle } from "react-icons/ai";
import dataMoto from "../pages/dataMoto.json";
import IconButton from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";

function addMoto() {
  const [session] = useSession();
  const [images, setImages] = useState([]);
  const [urls, setUrls] = useState([]);
  const [progress, setProgress] = useState(0);
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [price, setPrice] = useState("");
  const [modelList, setModelList] = useState([]);
  const [kilometers, setKilometers] = useState("");
  const [year, setYear] = useState("");
  const [horsepower, setHorsepower] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [phone2, setPhone2] = useState("");
  const [gearbox, setGearbox] = useState("");
  const [fuel, setFuel] = useState("");
  const [cooling, setCooling] = useState("");
  const [description, setDescription] = useState("");

  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

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
    setModelList(dataMoto.find((x) => x.name === e.target.value).model);
  };

  const today = new Date();
  const time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

  const handleChange = (e) => {
    setImages((prevState) => [...prevState, e.target.files[0]]);
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
      timestamp: today.toLocaleString("en-GB"),
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
      gearbox: gearbox,
      description: description,
      location: location,
      fuel: fuel,
      cooling: cooling,
      phone: phone,
      phone2: phone2,
    });
    setProgress(0);
    setMake("");
    setModel("");
    setPrice("");
    setImages([]);
    setKilometers("");
    setYear("");
    setHorsepower("");
    setGearbox("");
    setLocation("");
    setFuel("");
    setCooling("");
    setPhone("");
    setPhone2("");
    setDescription("");
  };

  const gearboxType = ["Manuel", "Automatic", "Semi-automatic"];
  const fuelType = ["Petrol", "Diesel", "Electric", "Hybrid"];
  const coolingType = ["Liquid Cooled", "Air Cooled"];

  const Input = styled("input")({
    display: "none",
  });
  return (
    <div className="flex justify-left">
      <button
        onClick={handleClick}
        className="shadow-md hover:bg-gray-100 px-6 bg-[#ffffff] py-1.5 rounded-sm"
      >
        <AiOutlinePlusCircle className="text-gray-900 h-5 w-5" />
      </button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
        }}
      >
        <Typography sx={{ p: 2 }}>
          <div className="flex flex-col w-[100%] max-w-3xl  m-auto ">
            <div className="flex justify-between my-2 items-center space-x-2">
              <FormControl className="w-48 m-1 bg-[#FFFFFF]" size="small">
                <InputLabel id="search-make">Make</InputLabel>
                <Select
                  labelId="search-make"
                  label="Make"
                  value={make}
                  onChange={modelResult}
                  MenuProps={MenuProps}
                >
                  {dataMoto.map((x, index) => (
                    <MenuItem key={index} value={x.name}>
                      {`${x.name}`}{" "}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl className="w-48 m-1 bg-[#FFFFFF]" size="small">
                <InputLabel id="search-model">Model</InputLabel>
                <Select
                  labelId="search-model"
                  label="Model"
                  value={model}
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
                size="small"
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
            <div className="flex justify-between my-2 items-center space-x-2">
              <TextField
                className="w-48 m-1 bg-[#FFFFFF]"
                size="small"
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
                size="small"
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
                size="small"
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
            <div className="flex justify-between my-2 items-center space-x-2">
              <FormControl className="w-48 m-1 bg-[#FFFFFF]" size="small">
                <InputLabel id="choise-gearbox">Gearbox</InputLabel>
                <Select
                  labelId="choise-gearbox"
                  label="Gearbox"
                  value={gearbox}
                  onChange={(event) => setGearbox(event.target.value)}
                  MenuProps={MenuProps}
                >
                  {gearboxType.map((x, index) => (
                    <MenuItem key={index} value={x}>
                      {`${x}`}{" "}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl className="w-48 m-1 bg-[#FFFFFF]" size="small">
                <InputLabel id="choise-gearbox">Fuel </InputLabel>
                <Select
                  labelId="choise-fuel"
                  label="Fuel"
                  value={fuel}
                  onChange={(event) => setFuel(event.target.value)}
                  MenuProps={MenuProps}
                >
                  {fuelType.map((x, index) => (
                    <MenuItem key={index} value={x}>
                      {`${x}`}{" "}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl className="w-48 m-1 bg-[#FFFFFF]" size="small">
                <InputLabel id="choise-gearbox">Cooling </InputLabel>
                <Select
                  labelId="choise-cooling"
                  label="Cooling"
                  value={fuel}
                  onChange={(event) => setFuel(event.target.value)}
                  MenuProps={MenuProps}
                >
                  {coolingType.map((x, index) => (
                    <MenuItem key={index} value={x}>
                      {`${x}`}{" "}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <TextField
              className="my-2 m-1"
              id="Description"
              label="Description"
              sx={{
                maxWidth: "100%",
              }}
              multiline
              rows={4}
              defaultValue="No description"
              onChange={(event) => setDescription(event.target.value)}
              value={description}
            />

            <div className="flex justify-between my-2 items-center space-x-2">
              <TextField
                className="w-48 m-1 bg-[#FFFFFF]"
                size="small"
                label="Location"
                id="Location"
                onChange={(event) => setLocation(event.target.value)}
                value={location}
              />

              <TextField
                className="w-48 m-1 bg-[#FFFFFF]"
                size="small"
                label="Phone"
                id="Phone"
                type="number"
                InputProps={{ inputProps: { min: 0 } }}
                onPaste={(e) => {
                  e.preventDefault();
                }}
                onKeyDown={(e) =>
                  ["e", "E", "-"].includes(e.key) && e.preventDefault()
                }
                onChange={(event) => setPhone(event.target.value)}
                value={phone}
              />

              <TextField
                className="w-48 m-1 bg-[#FFFFFF]"
                size="small"
                label="Phone 2"
                id="Phone 2"
                type="number"
                InputProps={{ inputProps: { min: 0 } }}
                onPaste={(e) => {
                  e.preventDefault();
                }}
                onKeyDown={(e) =>
                  ["e", "E", "-"].includes(e.key) && e.preventDefault()
                }
                onChange={(event) => setPhone2(event.target.value)}
                value={phone2}
              />
            </div>
            <div className="border w-[100%] flex max-w-2xl justify-around m-auto my-2">
              <div className="w-[75%] border-r flex items-center justify-around relative">
                {!images[0] ? (
                  <div className="h-60 flex items-center justify-around">
                    <label htmlFor="icon-button-file">
                      <Input
                        accept="image/*"
                        id="icon-button-file"
                        type="file"
                        onChange={handleChange}
                        onClick={(e) => (e.target.value = null)}
                      />
                      <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="span"
                      >
                        <MdCameraAlt className="h-10 w-10" />
                      </IconButton>
                    </label>
                  </div>
                ) : (
                  <Image
                    src={URL.createObjectURL(images[0])}
                    width={890}
                    height={500}
                    objectFit="cover"
                  />
                )}
              </div>
              <div className="w-[25%] flex flex-col">
                <div className="h-[33.3%] flex flex-col border-b items-center justify-around">
                  {!images[1] ? (
                    <label htmlFor="icon-button-file">
                      <Input
                        accept="image/*"
                        id="icon-button-file"
                        type="file"
                        onChange={handleChange}
                        onClick={(e) => (e.target.value = null)}
                      />
                      <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="span"
                      >
                        <MdCameraAlt className="h-8 w-8" />
                      </IconButton>
                    </label>
                  ) : (
                    <Image
                      src={URL.createObjectURL(images[1])}
                      width={890}
                      height={500}
                      objectFit="cover"
                    />
                  )}
                </div>
                <div className="h-[33.3%] flex flex-col border-b items-center justify-around">
                  {!images[2] ? (
                    <label htmlFor="icon-button-file">
                      <Input
                        accept="image/*"
                        id="icon-button-file"
                        type="file"
                        onChange={handleChange}
                        onClick={(e) => (e.target.value = null)}
                      />
                      <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="span"
                      >
                        <MdCameraAlt className="h-8 w-8" />
                      </IconButton>
                    </label>
                  ) : (
                    <Image
                      src={URL.createObjectURL(images[2])}
                      width={890}
                      height={500}
                      objectFit="cover"
                    />
                  )}
                </div>
                <div className="h-[33.3%] flex flex-col items-center justify-around">
                  {!images[3] ? (
                    <label htmlFor="icon-button-file">
                      <Input
                        accept="image/*"
                        id="icon-button-file"
                        type="file"
                        onChange={handleChange}
                        onClick={(e) => (e.target.value = null)}
                      />
                      <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="span"
                      >
                        <MdCameraAlt className="h-8 w-8" />
                      </IconButton>
                    </label>
                  ) : (
                    <Image
                      src={URL.createObjectURL(images[3])}
                      width={890}
                      height={500}
                      objectFit="cover"
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="text-center my-2 flex justify-center">
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
                className="border border-blue-400 m-0.5 rounded px-4 py-2 w-max hover:shadow active:scale-90 transition duration-150 bg-transparent text-sm hover:bg-[#f4f7f61a]"
              >
                Safe photos
              </button>
            </div>
            <div className="text-center my-2">
              {!urls[3] ? (
                <button
                  disabled={!urls[3]}
                  className="border border-gray-300 m-0.5 rounded px-4 py-2 w-max hover:shadow active:scale-90 transition duration-150 bg-transparent text-sm hover:bg-[#f4f7f61a]"
                >
                  Post product
                </button>
              ) : (
                <button
                  className="border border-sky-400 m-0.5 rounded px-4 py-2 w-max hover:shadow active:scale-90 transition duration-150 bg-transparent text-sm hover:bg-[#f4f7f61a]"
                  onClick={postUpload}
                >
                  Post product
                </button>
              )}

              <button
                className="border border-red-400 m-0.5 rounded px-6 py-2 w-max hover:shadow active:scale-90 transition duration-150 bg-transparent text-sm hover:bg-[#f4f7f61a]"
                onClick={() => setAnchorEl(null)}
              >
                Close add
              </button>
            </div>
          </div>
        </Typography>
      </Popover>
    </div>
  );
}

export default addMoto;
