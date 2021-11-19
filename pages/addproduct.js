import { useState } from "react";
import { storage, db } from "./firebase";
import firebase from "firebase";
import { useSession } from "next-auth/client";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { MdCameraAlt } from "react-icons/md";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

function addproduct({ username }) {
  const [session, loading] = useSession();
  const [images, setImages] = useState([]);
  const [urls, setUrls] = useState([]);
  const [progress, setProgress] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [price, setPrice] = useState("");

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
  };

  const postUpload = () => {
    db.collection("posts").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      make: make,
      model: model,
      price: price,
      imageUrl: urls[0],
      imageUrl2: urls[1],
      imageUrl3: urls[2],
      imageUrl4: urls[3],
      username: session.user.name,
    });
    setProgress(0);
    setMake("");
    setModel("");
    setPrice("");
    setImages([]);
  };
  console.log("images: ", images);
  console.log("urls", urls);
  const Input = styled("input")({
    display: "none",
  });
  return (
    <div className="flex flex-col w-[80%] m-auto mt-7 border border-gray-300">
      <div className="flex justify-between">
        <label htmlFor="icon-button-file" className="mr-8">
          <Input
            accept="image/*"
            id="icon-button-file"
            multiple
            type="file"
            onChange={handleChange}
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
          Upload{" "}
        </button>
      </div>
      <div className="flex justify-between my-2">
        <input
          type="text"
          placeholder="Enter a make"
          onChange={(event) => setMake(event.target.value)}
          value={make}
          className="p-2 "
        />
        <input
          type="text"
          placeholder="Enter a model"
          onChange={(event) => setModel(event.target.value)}
          value={model}
          className="p-2 "
        />
        <input
          type="text"
          placeholder="Enter a price"
          onChange={(event) => setPrice(event.target.value)}
          value={price}
          className="p-2 "
        />
      </div>
      <div className="text-center ">
        <button
          disabled={!urls[3]}
          className="border border-gray-300 m-0.5 rounded-sm px-4 py-2 w-max hover:shadow active:scale-90 transition duration-150 bg-transparent text-sm hover:bg-[#f4f7f61a]"
          onClick={postUpload}
        >
          Post product
        </button>
      </div>
    </div>
  );
}

export default addproduct;
