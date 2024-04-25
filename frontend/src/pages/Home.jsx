import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/books")
      .then((res) => {
        setBooks(res.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-center items-center mb-3">
        <div class="flex justify-center items-center">
          <h1 class="text-4xl font-bold">All Books📖</h1>
        </div>
      </div>
        <Link to="/books/create" className="flex justify-end mb-3">
          <div className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
            Add Books
          </div>
        </Link>

      {loading ? (
        <Spinner />
      ) : (
        <table className="w-full border-separate border-spacing-2">
          <thead>
            <tr>
              <th className="text-lg font-bold border-b-2 border-purple-800 py-2 bg-pink-300 rounded-t-lg">No.</th>
              <th className="text-lg font-bold border-b-2 border-purple-800 py-2 bg-pink-300 rounded-t-lg">Book Name</th>
              <th className="text-lg font-bold border-b-2 border-purple-800 py-2 bg-pink-300 rounded-t-lg max-md:hidden">
                Book Author
              </th>
              <th className="text-lg font-bold border-b-2 border-purple-800 py-2 bg-pink-300 rounded-t-lg max-md:hidden">
                Publish Year
              </th>
              <th className="text-lg font-bold border-b-2 border-purple-800 py-2 bg-pink-300 rounded-t-lg max-md:hidden">
                No. of Pages
              </th>
              <th className="text-lg font-bold border-b-2 border-purple-800 py-2 bg-pink-300 rounded-t-lg">Actions</th>
            </tr>
          </thead>
          
          <tbody>
            {books.map((book, index) => (
              <tr key={book._id} className="h-8 text-center">
                <td className="text-sm font-bold border-b-2 bg-pink-100 border-gray-400 py-2">
                  {index + 1}
                </td>
                <td className="text-sm font-bold border-b-2 border-gray-400 py-2">
                  {book.title}
                </td>

                <td className="text-sm font-bold border-b-2 border-gray-400 py-2">
                  {book.author}
                </td>
                <td className="text-sm font-bold border-b-2 border-gray-400 py-2">
                  {book.publishYear}
                </td>
                <td className="text-sm font-bold border-b-2 border-gray-400 py-2">
                  {book.pages}
                </td>
                <td className="text-sm font-bold border-b-2 border-gray-400 py-2">
                  <div className="flex justify-center gap-x-4">
                    <Link to={`/books/details/${book._id}`}>
                      <div className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">Info</div>
                    </Link>
                    <Link to={`/books/edit/${book._id}`}>
                      <div className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">Edit</div>
                    </Link>
                    <Link to={`/books/delete/${book._id}`}>
                      <div className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">Delete</div>
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Home;
