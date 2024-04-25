import React, { useState, useEffect } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [pages, setPages] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        console.log(response.data.data.author);
        setAuthor(response.data.data.author);
        setPublishYear(response.data.data.publishYear);
        setPages(response.data.data.pages);
        setTitle(response.data.data.title);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert("An error happened. Please Chack console");
        console.log(error);
      });
  }, []);

  const handleEditBook = () => {
    const data = {
      title,
      author,
      publishYear,
      pages,
    };
    setLoading(true);
    axios
      .put(`http://localhost:5555/books/${id}`, data)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4 font-bold text-center">Edit Book📝</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border-4 w-[600px] p-4 mx-auto border-purple-900">
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
        <button className="p-2 m-8 bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded" onClick={handleEditBook}>
          Save
        </button>
      </div>
    </div>
  );
};

export default EditBook;
