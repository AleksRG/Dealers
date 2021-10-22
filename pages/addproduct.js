import { useState } from "react";
import { storage, db } from "./firebase";
import firebase from "firebase";
import { useSession } from "next-auth/client";

function addproduct({ username }) {
  const [session, loading] = useSession();
  const [images, setImages] = useState([]);
  const [urls, setUrls] = useState([]);
  const [progress, setProgress] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [price, setPrice] = useState("");

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
      const uploadTask = storage.ref(`/images/${image.name}`).put(image);
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
            .child(image.name)
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
  return (
    <div className="flex flex-col w-3/5 m-auto border border-gray-700">
      <progress
        className="w-full m-0.5 pr-1"
        id="file"
        max="100"
        value={progress}
      >
        {progress}%
      </progress>

      <div className="flex justify-between">
        <input
          type="file"
          id="fileinput"
          multiple
          onChange={handleChange}
        ></input>
        <button
          onClick={handleUpload}
          className="bg-yellow-300 m-0.5 rounded-lg p-0.5"
        >
          Upload Pictures{" "}
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
          className="bg-lime-300 m-0.5 rounded-lg p-0.5 w-max 
        "
          onClick={postUpload}
        >
          Post product
        </button>
      </div>
    </div>
  );
}

export default addproduct;
