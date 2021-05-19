import React, { useState } from "react";
import Axios from "axios";

const Prototype = () => {
  const [caption, setCaption] = useState("");
  const [file, setFiles] = useState(null);

  const submitBtn = (e) => {
    let formData = new FormData();
    formData.append("caption", caption);
    formData.append("file", file);

    Axios.post("https://ecplcsms.herokuapp.com/upload-file", formData, {
      headers: {
        "content-type": "multipart/form-data",
      },
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <form onSubmit={(e) => e.preventDefault()} className="class-wrapper">
        <input
          type="file"
          onChange={(e) => {
            setFiles(e.target.files[0]);
          }}
        />
        <input
          type="text"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        <input type="submit" onClick={submitBtn} />
      </form>
    </>
  );
};

export default Prototype;
