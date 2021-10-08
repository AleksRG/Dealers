import { useState } from "react";
import { storage, db } from "../firebase";
import firebase from "firebase";

function ImageUpload({ username }) {
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState("");
  const [caption, setCaption] = useState("");

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const handleUpload = () => {
    //UPLOAD IN STORAGE...
    const uploadTask = storage.ref(`/images/${image.name}`).put(image);

    uploadTask.on(
      "state_change",
      (snapshot) => {
        //PROGRESS FUNCTION ...
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        //ERROR FUNCTION....
        console.log(error);
        alert(error.message);
      },

      () => {
        //COMPLITE FUNCTION....
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            //POST IMAGE IN DB...
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageUrl: url,
              username: username,
            });
            setProgress(0);
            setCaption("");
            setImage("");
          });
      }
    );
  };

  return (
    <div className="flex flex-col w-3/5 m-auto">
      <progress className="w-full" value={progress} max="100" />
      <input
        type="text"
        placeholder="Enter a caption.."
        onChange={(event) => setCaption(event.target.value)}
        value={caption}
      />
      <input type="file" onChange={handleChange}></input>
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default ImageUpload;
