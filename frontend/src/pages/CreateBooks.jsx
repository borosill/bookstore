import React, { useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateBooks = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [pages, setPages] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSaveBook = () => {
    const data = {
      title,
      author,
      publishYear,
      pages,
    };
    setLoading(true);
    axios
      .post("http://localhost:5555/books", data)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Error", { variant: "error" });
        console.log(error);
      });
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4 font-bold text-center">Create Book✒</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border-4 w-[600px] p-6 mx-auto border-purple-900">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-800">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-b-2 border-gray-500 px-4 py-2 bg-pink-100 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-800">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border-b-2 border-gray-500 px-4 py-2 bg-pink-100 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-800">Publish Year</label>
          <input
            type="number"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className="border-b-2 border-gray-500 px-4 py-2 bg-pink-100 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-800">No. of Pages</label>
          <input
            type="number"
            value={pages}
            onChange={(e) => setPages(e.target.value)}
            className="border-b-2 border-gray-500 px-4 py-2 bg-pink-100 w-full"
          />
        </div>
        <button className="p-2 m-8 bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded" onClick={handleSaveBook}>
          Save
        </button>
      </div>
    </div>
  );
};

export default CreateBooks;
