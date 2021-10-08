import { useState } from "react";
import { storage, db } from "../firebase";
import firebase from "firebase";

function MultipleUpload({ username }) {
  const [images, setImages] = useState([]);
  const [urls, setUrls] = useState([]);
  const [progress, setProgress] = useState("");
  const [caption, setCaption] = useState("");

  const handleChange = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      const newImage = e.target.files[i];
      newImage["id"] = Math.random();
      setImages((prevState) => [...prevState, newImage]);
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
    Promise.all(progress)
      .then(() => alert("All image up"))
      .catch((err) => console.log(err));
  };

  const postUpload = () => {
    db.collection("posts").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      caption: caption,
      imageUrl: urls[0],
      imageUrl2: urls[1],
      imageUrl3: urls[2],
      imageUrl4: urls[3],
      username: username,
    });
    setProgress(0);
    setCaption("");
    setImages([]);
  };
  console.log("images: ", images);
  console.log("urls", urls);
  return (
    <div className="flex flex-col w-3/5 m-auto border-2">
      <progress className="w-full m-0.5" id="file" max="100" value={progress}>
        {progress}%
      </progress>

      <div className="flex justify-between">
        <input type="file" multiple onChange={handleChange}></input>
        <button
          onClick={handleUpload}
          className="bg-green-400 m-0.5 rounded-lg p-0.5"
        >
          Upload Pictures{" "}
        </button>
      </div>
      <input
        type="text"
        placeholder="Enter a caption..."
        onChange={(event) => setCaption(event.target.value)}
        value={caption}
        className="p-2 "
      />
      <button
        disabled={!urls[3]}
        className="bg-pink-400 m-0.5 rounded-lg p-0.5 "
        onClick={postUpload}
      >
        Post product
      </button>
    </div>
  );
}

export default MultipleUpload;
