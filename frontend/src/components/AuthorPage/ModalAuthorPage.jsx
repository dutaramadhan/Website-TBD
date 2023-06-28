import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export const Modal = ({ closeModal }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();

  const [formState, setFormState] = useState({
    author_name: "",
    year_born: "",
    year_died: null,
  });
  const [errors, setErrors] = useState("");


  const validateForm = () => {
    const {  author_name,
    year_born} = formState;
    if (author_name && year_born) {
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
  
    axios.post('http://localhost:3100/api/v1/tbdprojectdatabase/authors', formState)
      .then(response => {
        console.log(response.data);
        closeModal();
        navigate('/author-page');
      })
      .catch(error => {
        console.error(error);
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
      window.location.reload();
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
            <label htmlFor="author_name" className="font-semibold">
              Author Name
            </label>
            <input
              name="author_name"
              onChange={handleChange}
              value={formState.author_name}
              className="border border-black rounded-md p-1 text-base"
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="year_born" className="font-semibold">
              Year Born
            </label>
            <input
            type="number"
              name="year_born"
              onChange={handleChange}
              value={formState.year_born}
              className="border border-black rounded-md p-1 text-base"
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="year_died" className="font-semibold">
              Year Died
            </label>
            <input
            type="number"
              name="year_died"
              onChange={handleChange}
              value={formState.year_died}
              className="border border-black rounded-md p-1 text-base"
            />
          </div>
          {errors && <div className="error">{`Please include: ${errors}`}</div>}
          <button 
                type="submit"
                className="mt-4 border-none bg-blue-600 text-white py-2 px-4 rounded-lg cursor-pointer shadow-md"
                onClick={
                  handleSubmit
                  }
                disabled={isLoading} // Menonaktifkan tombol saat isLoading true
          >
            {isLoading ? 'Submitting...' : 'Submit'}
          </button>

        </form>
      </div>
    </div>
  );
};
