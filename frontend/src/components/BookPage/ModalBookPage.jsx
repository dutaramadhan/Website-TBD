import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export const Modal = ({ closeModal }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [publishers, setPublishers] = useState([]); 
  const [authors, setAuthors] = useState([]); 
  const [categories, setCategories] = useState([]); 
  const [languages, setLanguages] = useState([]); 
  const navigate = useNavigate();

  const [formState, setFormState] = useState({
    book_title: "",
    description: null,
    release_year: null,
    language_id: "",
    book_price: "",
    publisher_id: "",
    category_id: "",
    author_id: "",
  });
  const [errors, setErrors] = useState("");

  useEffect(() => {
    loadPublishers();
    loadAuthors();
    loadCategories();
    loadLanguages();
  }, []);

  const loadAuthors = async () => {
    try {
      const response = await axios.get('http://localhost:3100/api/v1/tbdprojectdatabase/authors');
      setAuthors(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const loadLanguages = async () => {
    try {
      const response = await axios.get('http://localhost:3100/api/v1/tbdprojectdatabase/languages');
      setLanguages(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const loadCategories = async () => {
    try {
      const response = await axios.get('http://localhost:3100/api/v1/tbdprojectdatabase/categories');
      setCategories(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const loadPublishers = async () => {
    try {
      const response = await axios.get('http://localhost:3100/api/v1/tbdprojectdatabase/publishers');
      setPublishers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const validateForm = () => {
    const { book_title, language_id, book_price, publisher_id, category_id, author_id } = formState;
    if (book_title && language_id && book_price && publisher_id && category_id && author_id) {
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
        navigate('/book-page');
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
            <label htmlFor="name" className="font-semibold">
              Title
            </label>
            <input
              name="book_title"
              onChange={handleChange}
              value={formState.book_title}
              className="border border-black rounded-md p-1 text-base"
            />
          </div>
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
        <label htmlFor="release_year" className="font-semibold">
          Release Year
        </label>
        <input
          type="number"
          name="release_year"
          onChange={handleChange}
          value={formState.release_year}
          className="border border-black rounded-md p-1 text-base"
        />
      </div>

      <div className="flex flex-col mb-4">
        <label htmlFor="language_id" className="font-semibold">
          Language
        </label>
        <select
          name="language_id"
          onChange={handleChange}
          value={formState.language_id}
          className="border border-black rounded-md p-1 text-base"
        >
          <option value="">Select Language</option>
          {languages.map(language => (
            <option key={language.language_id} value={language.language_id}>
              {language.language_name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col mb-4">
        <label htmlFor="book_price" className="font-semibold">
          Price
        </label>
        <input
          type="number"
          name="book_price"
          onChange={handleChange}
          value={formState.book_price}
          className="border border-black rounded-md p-1 text-base"
        />
      </div>

      <div className="flex flex-col mb-4">
        <label htmlFor="publisher_id" className="font-semibold">
          Publisher
        </label>
        <select
          name="publisher_id"
          onChange={handleChange}
          value={formState.publisher_id}
          className="border border-black rounded-md p-1 text-base"
        >
          <option value="">Select Publisher</option>
          {publishers.map(publisher => (
            <option key={publisher.publisher_id} value={publisher.publisher_id}>
              {publisher.publisher_name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col mb-4">
        <label htmlFor="category_id" className="font-semibold">
          Category
        </label>
        <select
          name="category_id"
          onChange={handleChange}
          value={formState.category_id}
          className="border border-black rounded-md p-1 text-base"
        >
          <option value="">Select Category</option>
          {categories.map(category => (
            <option key={category.category_id} value={category.category_id}>
              {category.category_name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col mb-4">
        <label htmlFor="author_id" className="font-semibold">
          Author
        </label>
        <select
          name="author_id"
          onChange={handleChange}
          value={formState.author_id}
          className="border border-black rounded-md p-1 text-base"
        >
          <option value="">Select Author</option>
          {authors.map(author => (
            <option key={author.author_id} value={author.author_id}>
              {author.author_name}
            </option>
          ))}
        </select>
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
)}
          