import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export const EditModal = ({ Staff, closeModal }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [address, setAddress] = useState([]);
  const [stores, setStores] = useState([]);
  const navigate = useNavigate();
  
  const {
    staff_id, staff_name, address_id, email, store_id, active, username, password
  } = Staff;

  const [formState, setFormState] = useState({
    staff_id: parseInt(staff_id),
    staff_name: staff_name,
    address_id: address_id,
    email: email,
    store_id: store_id,
    active: active,
    username: username,
    password:password,
  });

  useEffect(() => {
    loadAddress();
    loadStore();
  }, []);

  const loadAddress = async () => {
    try {
      const response = await axios.get('http://localhost:3100/api/v1/tbdprojectdatabase/address');
      setAddress(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const loadStore = async () => {
    try {
      const response = await axios.get('http://localhost:3100/api/v1/tbdprojectdatabase/stores');
      setStores(response.data);
    } catch (error) {
      console.error(error);
    }
  };


  const [errors, setErrors] = useState("");

  const validateForm = () => {
    const {staff_name, address_id, store_id, active, username} = formState;
    if (staff_name && address_id && store_id && active && username) {
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
  
    axios.put(`http://localhost:3100/api/v1/tbdprojectdatabase/staff/${formState.staff_id}`, formState)
      .then(response => {
        console.log(response.data);
        closeModal();
        navigate('/staff-page');
        window.location.reload();
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
            <label htmlFor="staff_name" className="font-semibold">
              Staff Name
            </label>
            <input
              name="staff_name"
              onChange={handleChange}
              value={formState.staff_name}
              className="border border-black rounded-md p-1 text-base"
            />
          </div>
          <div className="flex flex-col mb-4">
              <label htmlFor="address_id" className="font-semibold">
              Address
            </label>
            <select
              name="address_id"
              onChange={handleChange}
              value={formState.address_id}
              className="border border-black rounded-md p-1 text-base"
            >
          {address.map(address => (
            <option key={address.address_id} value={address.address_id}>
              {address.address_name}
            </option>
          ))}
        </select>
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
              <label htmlFor="store_id" className="font-semibold">
              Store
            </label>
            <select
              name="store_id"
              onChange={handleChange}
              value={formState.store_id}
              className="border border-black rounded-md p-1 text-base"
            >
          {stores.map(store => (
            <option key={store.store_id} value={store.store_id}>
              {store.store_name}
            </option>
          ))}
        </select>
      </div>
        <div className="flex flex-col mb-4">
            <label htmlFor="active" className="font-semibold">
            Active
            </label>
            <select
            name="active"
            onChange={handleChange}
            value={formState.active}
            className="border border-black rounded-md p-1 text-base"
            >
            <option value={true}>Active</option>
            <option value={false}>Not Active</option>
            </select>
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="username" className="font-semibold">
              Username
            </label>
            <input
              name="username"
              onChange={handleChange}
              value={formState.username}
              className="border border-black rounded-md p-1 text-base"
            />
          </div>
          <div className="flex flex-col mb-4">
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
