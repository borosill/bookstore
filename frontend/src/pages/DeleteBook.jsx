import React, { useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/books/${id}`)
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
      <h1 className="text-3xl my-6 font-bold text-center">Delete Book🚮</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col items-center border-4 border-purple-900 w-[600px] p-8 mx-auto">
        <h3 className="text-2xl">Do you want to delete this book?</h3>

        <button
          className="bg-red-600 w-full m-6 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleDeleteBook}
        >
          Yes, Delete it
        </button>
      </div>
    </div>
  );
};

export default DeleteBook;
