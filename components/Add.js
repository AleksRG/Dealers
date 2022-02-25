import { useState } from "react";
import { storage, db } from "/firebase";
import { useSession } from "next-auth/client";
import { FaCloudUploadAlt } from "react-icons/fa";
import dataCar from "../pages/dataCar.json";
import dataMoto from "../pages/dataMoto.json";
import ListButton from "./ListButton";

function Add() {
  const [session] = useSession();
  const [make, setMake] = useState("All Makes");
  const [model, setModel] = useState("All Models");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState([]);
  const [urls, setUrls] = useState([]);
  const [progress, setProgress] = useState(0);
  const [modelList, setModelList] = useState([]);
  const [kilometers, setKilometers] = useState("");
  const [year, setYear] = useState("");
  const [horsepower, setHorsepower] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [phone2, setPhone2] = useState("");
  const [gearbox, setGearbox] = useState("Gearbox");
  const [fuel, setFuel] = useState("Fuel type");
  const [cooling, setCooling] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Moto");
  const [dataVehicle, setDataVehile] = useState(dataMoto);
  const [colectionFb, setColectionFb] = useState("moto");

  const fuelTypes = [
    { name: "Fuel type" },
    { name: "Petrol" },
    { name: "Diesel" },
    { name: "Electric" },
    { name: "Hybrid" },
  ];
  const gearboxType = [
    { name: "Gearbox" },
    { name: "Manual" },
    { name: "Automatic" },
  ];
  const categoryData = [{ name: "Moto" }, { name: "Car" }];

  function makeFilter(value) {
    setMake(value);
    setModelList(dataVehicle.find((x) => x.name === value).model) ||
      "All Models";
    setModel("All Models");
  }
  function modelFilter(value) {
    setModel(value);
  }

  function fuelTypeFilter(value) {
    setFuel(value);
  }
  function gearboxFilter(value) {
    setGearbox(value);
  }
  function categoryFilter(value) {
    setCategory(value);
    setMake("All Makes");
    setModel("All Models");
    value == "Moto" ? setDataVehile(dataMoto) : setDataVehile(dataCar);
    value == "Moto" ? setColectionFb("moto") : setColectionFb("posts");
  }

  const today = new Date();
  const time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

  function handleChange(e) {
    setImages((prevState) => [...prevState, e.target.files[0]]);
  }

  function handleUpload() {
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
  }

  function postUpload() {
    db.collection(colectionFb).add({
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
    setMake("All Makes");
    setModel("All Models");
    setPrice("");
    setImages([]);
    setKilometers("");
    setYear("");
    setHorsepower("");
    setGearbox("Gearbox");
    setLocation("");
    setFuel("Fuel type");
    setCooling("");
    setPhone("");
    setPhone2("");
    setDescription("");
  }

  return (
    <div className="m-auto max-w-5xl ">
      <div className="relative flex flex-col items-center justify-center flex-1 m-auto">
        <div className="items-center mt-4">
          <ListButton
            type={category}
            func={categoryFilter}
            data={categoryData}
          />
        </div>

        <div className="flex flex-wrap justify-around mt-4 sm:w-full ">
          <div className="items-center mt-2">
            <ListButton type={make} func={makeFilter} data={dataVehicle} />
          </div>
          <div className="items-center mt-2">
            <ListButton type={model} func={modelFilter} data={modelList} />
          </div>
          <div className="items-center mt-2">
            <ListButton
              type={gearbox}
              func={gearboxFilter}
              data={gearboxType}
            />
          </div>
          <div className="items-center mt-2">
            <ListButton type={fuel} func={fuelTypeFilter} data={fuelTypes} />
          </div>

          <div className="relative items-center mt-2">
            <input
              className="shadow-md appearance-none ring-1 ring-gray-100 rounded-md w-44 p-2 text-sm  focus:outline-none mt-1"
              value={price}
              type="number"
              placeholder="Price"
              min="0"
              onPaste={(e) => {
                e.preventDefault();
              }}
              onKeyDown={(e) =>
                ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
              }
              onChange={(event) => setPrice(Number(event.target.value))}
            />
          </div>

          <div className="relative items-center mt-2">
            <input
              className="shadow-md appearance-none ring-1 ring-gray-100 rounded-md w-44 p-2 text-sm  focus:outline-none mt-1"
              value={horsepower}
              type="number"
              placeholder="Horsepower"
              min="0"
              onPaste={(e) => {
                e.preventDefault();
              }}
              onKeyDown={(e) =>
                ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
              }
              onChange={(event) => setHorsepower(Number(event.target.value))}
            />
          </div>

          <div className="relative items-center mt-2">
            <input
              className="shadow-md appearance-none ring-1 ring-gray-100 rounded-md w-44 p-2 text-sm  focus:outline-none mt-1"
              value={year}
              type="number"
              placeholder="Year"
              min="0"
              onPaste={(e) => {
                e.preventDefault();
              }}
              onKeyDown={(e) =>
                ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
              }
              onChange={(event) => setYear(Number(event.target.value))}
            />
          </div>

          <div className="relative items-center mt-2">
            <input
              className="shadow-md appearance-none ring-1 ring-gray-100 rounded-md w-44 p-2 text-sm focus:outline-none mt-1"
              value={kilometers}
              type="number"
              placeholder="Kilometers"
              min="0"
              onPaste={(e) => {
                e.preventDefault();
              }}
              onKeyDown={(e) =>
                ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
              }
              onChange={(event) => setKilometers(Number(event.target.value))}
            />
          </div>
          <div className="relative items-center mt-2">
            <input
              className="shadow-md appearance-none ring-1 ring-gray-100 rounded-md w-44 p-2 text-sm focus:outline-none mt-1"
              value={location}
              type="text"
              placeholder="Location"
              onChange={(event) => setLocation(event.target.value)}
            />
          </div>

          <div className="relative items-center mt-2">
            <input
              className="shadow-md appearance-none ring-1 ring-gray-100  rounded-md  w-44 p-2 text-sm focus:outline-none mt-1"
              value={phone}
              type="number"
              placeholder="Phone"
              min="0"
              onPaste={(e) => {
                e.preventDefault();
              }}
              onKeyDown={(e) =>
                ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
              }
              onChange={(event) => setPhone(event.target.value)}
            />
          </div>

          <div className="relative items-center mt-2">
            <input
              className="shadow-md appearance-none ring-1 ring-gray-100 rounded-md w-44 p-2 text-sm  focus:outline-none mt-1"
              value={phone2}
              type="number"
              placeholder="Phone 2"
              min="0"
              onPaste={(e) => {
                e.preventDefault();
              }}
              onKeyDown={(e) =>
                ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
              }
              onChange={(event) => setPhone2(event.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="px-2">
        <textarea
          className="shadow-md h-60 w-full mt-3 appearance-none ring-1 ring-gray-100 rounded-md p-2 text-sm  focus:outline-none scrollbar-hide"
          value={description}
          placeholder="Description"
          onChange={(event) => setDescription(event.target.value)}
        ></textarea>
      </div>

      {images[0] ? (
        <div className="relative flex flex-col items-center justify-center flex-1 m-auto">
          <div className="flex flex-wrap justify-around sm:w-full ">
            {images.map((a) => (
              <img
                src={URL.createObjectURL(a)}
                objectFit="cover"
                className="rounded-lg w-60 h-44 items-center mt-2"
              />
            ))}
          </div>{" "}
        </div>
      ) : (
        ""
      )}
      {progress === 0 ? (
        <>
          {" "}
          <div className="flex w-full items-center justify-center mt-2">
            <label
              className="w-60 flex flex-col items-center px-4 py-6 bg-white rounded-lg shadow-lg tracking-wide ring-1 ring-gray-100 cursor-pointer hover:bg-gray-100"
              onChange={handleChange}
            >
              <FaCloudUploadAlt className="text-3xl my-1 text-sky-500" />
              <span className="mt-2 leading-normal text-sm">Select a file</span>
              <input type="file" className="hidden" />
            </label>
          </div>
          <div className="text-center my-2 flex justify-center">
            {images.length < 4 ? (
              ""
            ) : (
              <button
                onClick={handleUpload}
                className="shadow-md appearance-none ring-1 ring-gray-100 rounded-md w-44 p-2 text-sm focus:outline-none mt-1 hover:bg-gray-100"
              >
                Safe photos
              </button>
            )}
          </div>{" "}
        </>
      ) : (
        ""
      )}

      <div className="bg-gray-200 h-1 mt-4 mx-2">
        <div
          className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-1"
          style={{ width: `${Math.round(progress)}%` }}
        ></div>
      </div>

      <div className="text-center my-2">
        {urls[3] ? (
          <button
            className="shadow-md appearance-none ring-1 ring-gray-100 rounded-md w-44 p-2 text-sm focus:outline-none mt-1 hover:bg-gray-100"
            onClick={postUpload}
          >
            Post product
          </button>
        ) : (
          <button className="shadow-md appearance-none ring-1 ring-gray-100 rounded-md w-44 p-2 text-sm bg-gray-100 cursor-default">
            Post product
          </button>
        )}
      </div>
    </div>
  );
}

export default Add;
