import React, { useState, useEffect } from "react";
import axios from 'axios';


export const Modal = ({ closeModal, onSubmit, defaultValue }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [formState, setFormState] = useState({
    title: "",
    description: "",
    release_year: "",
    language_id: "",
    price: "",
  });
  const [errors, setErrors] = useState("");

  useEffect(() => {
    if (defaultValue) {
      setFormState(defaultValue);
    }
  }, [defaultValue]);

  const validateForm = () => {
    const { book_title, description, release_year, language_id, price} = formState;
    if (book_title && description && release_year && language_id && price) {
      setErrors("");
      return true;
    } else {
      const errorFields = [];
      for (const [key, value] of Object.entries(formState)) {
        if (!value) {
          errorFields.push(key);
        }
      }
      setErrors(errorFields.join(", "));
      return false;
    }
  };

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!validateForm()) return;
  
    setIsLoading(true);
  
    axios.post('http://localhost:3100/api/v1/tbdprojectdatabase/books', formState)
      .then(response => {
        console.log(response.data);
        closeModal();
      })
      .catch(error => {
        console.error(error);
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  
  return (
    <div
      className="fixed z-10 inset-0 flex items-center justify-center bg-black bg-opacity-40"
      onClick={(e) => {
        if (
          e.target.className ===
          "fixed z-10 inset-0 flex items-center justify-center bg-black bg-opacity-40"
        )
          closeModal();
      }}
    >
      <div className="bg-white p-8 rounded-md w-64">
        <form>
          <div className="flex flex-col mb-4">
            <label htmlFor="name" className="font-semibold">
              Title
            </label>
            <input
              name="title"
              onChange={handleChange}
              value={formState.book_title}
              className="border border-black rounded-md p-1 text-base"
            />
          </div>
          {/* <div className="flex flex-col mb-4">
            <label htmlFor="description" className="font-semibold">
              Author
            </label>
            <input
              name="email"
              onChange={handleChange}
              value={formState.email}
              className="border border-black rounded-md p-1 text-base"
            />
          </div> */}
          <div className="flex flex-col mb-4">
            <label htmlFor="description" className="font-semibold">
              Description
            </label>
            <textarea
              name="description"
              onChange={handleChange}
              value={formState.description}
              className="border border-black rounded-md p-1 text-base"
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="relase_year" className="font-semibold">
              Release Year
            </label>
            <input
              name="release_year"
              onChange={handleChange}
              value={formState.release_year}
              className="border border-black rounded-md p-1 text-base"
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="language_id" className="font-semibold">
              Language ID
            </label>
            <input
              name="language_id"
              onChange={handleChange}
              value={formState.language_id}
              className="border border-black rounded-md p-1 text-base"
            />
          </div> <div className="flex flex-col mb-4">
            <label htmlFor="price" className="font-semibold">
              Price
            </label>
            <input
              name="price"
              onChange={handleChange}
              value={formState.book_price}
              className="border border-black rounded-md p-1 text-base"
            />
          </div>
          {errors && <div className="error">{`Please include: ${errors}`}</div>}
          <button
                type="submit"
                className="mt-4 border-none bg-blue-600 text-white py-2 px-4 rounded-lg cursor-pointer shadow-md"
                onClick={handleSubmit}
                disabled={isLoading} // Menonaktifkan tombol saat isLoading true
          >
            {isLoading ? 'Submitting...' : 'Submit'}
          </button>

        </form>
      </div>
    </div>
  );
};
