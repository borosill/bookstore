import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    console.log(id);
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        console.log(response.data.data);
        setBook(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4 font-bold text-center">Show Book📙📘📕</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col border-4 border-purple-900 w-fit p-4 mx-auto">
          <div className="my-3 bg-pink-100">
            <span className="text-xl mr-4 text-gray-800">Id: </span>
            <span>{book._id}</span>
          </div>
          <div className="my-3 bg-pink-100">
            <span className="text-xl mr-4 text-gray-800">Title: </span>
            <span>{book.title}</span>
          </div>
          <div className="my-3 bg-pink-100">
            <span className="text-xl mr-4 text-gray-800">Author: </span>
            <span>{book.author}</span>
          </div>
          <div className="my-3 bg-pink-100">
            <span className="text-xl mr-4 text-gray-800">Publish Year: </span>
            <span>{book.publishYear}</span>
          </div>
          <div className="my-3 bg-pink-100">
            <span className="text-xl mr-4 text-gray-800">No. of Pages: </span>
            <span>{book.pages}</span>
          </div>
          <div className="my-3 bg-pink-100">
            <span className="text-xl mr-4 text-gray-800">Create Time: </span>
            <span>{new Date(book.createdAt).toString()}</span>
          </div>
          <div className="my-3 bg-pink-100">
            <span className="text-xl mr-4 text-gray-800">Last Update Time: </span>
            <span>{new Date(book.updatedAt).toString()}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowBook;
