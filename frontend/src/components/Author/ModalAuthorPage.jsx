import React, { useState, useEffect } from "react";

export const Modal = ({ closeModal, onSubmit, defaultValue }) => {
  const [formState, setFormState] = useState({
    name: "",
    address: "",
    store: "",
    status: "",
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState("");

  useEffect(() => {
    if (defaultValue) {
      setFormState(defaultValue);
    }
  }, [defaultValue]);

  const validateForm = () => {
    const { name, email, address, store, username, password } = formState;
    if (name && email && address && store && username && password) {
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

    onSubmit(formState);

    closeModal();
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
              Name
            </label>
            <input
              name="name"
              onChange={handleChange}
              value={formState.name}
              className="border border-black rounded-md p-1 text-base"
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="email" className="font-semibold">
              Email
            </label>
            <input
              name="email"
              onChange={handleChange}
              value={formState.email}
              className="border border-black rounded-md p-1 text-base"
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="address" className="font-semibold">
              Address
            </label>
            <textarea
              name="address"
              onChange={handleChange}
              value={formState.address}
              className="border border-black rounded-md p-1 text-base"
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="store" className="font-semibold">
              Store
            </label>
            <input
              name="store"
              onChange={handleChange}
              value={formState.store}
              className="border border-black rounded-md p-1 text-base"
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="status" className="font-semibold">
              Status
            </label>
            <select
              name="status"
              onChange={handleChange}
              value={formState.status}
              className="border border-black rounded-md p-1 text-base"
            >
              <option value="active">Active</option>
              <option value="nonactive">Non Active</option>
              <option value="nothing">Nothing</option>
            </select>
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="username" className="font-semibold">
              User Name
            </label>
            <input
              name="username"
              onChange={handleChange}
              value={formState.username}
              className="border border-black rounded-md p-1 text-base"
            />
          </div> <div className="flex flex-col mb-4">
            <label htmlFor="password" className="font-semibold">
              Password
            </label>
            <input
              name="password"
              onChange={handleChange}
              value={formState.password}
              className="border border-black rounded-md p-1 text-base"
            />
          </div>
          {errors && <div className="error">{`Please include: ${errors}`}</div>}
          <button
            type="submit"
            className="mt-4 border-none bg-blue-600 text-white py-2 px-4 rounded-lg cursor-pointer shadow-md"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
