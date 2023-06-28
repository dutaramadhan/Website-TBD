import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export const Modal = ({ closeModal }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();

  const [formState, setFormState] = useState({
    publisher_name: "",
    telephone: null,
  });
  const [errors, setErrors] = useState("");


  const validateForm = () => {
    const {  publisher_name} = formState;
    if (publisher_name) {
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
  
    axios.post('http://localhost:3100/api/v1/tbdprojectdatabase/publishers', formState)
      .then(response => {
        console.log(response.data);
        closeModal();
        navigate('/publisher-page');
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
            <label htmlFor="publisher_name" className="font-semibold">
              Publisher Name
            </label>
            <input
              name="publisher_name"
              onChange={handleChange}
              value={formState.publisher_name}
              className="border border-black rounded-md p-1 text-base"
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="telephone" className="font-semibold">
              Telephone
            </label>
            <input
              name="telephone"
              onChange={handleChange}
              value={formState.telephone}
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
