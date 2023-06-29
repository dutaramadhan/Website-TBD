import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export const Modal = ({ closeModal }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [address, setAddress] = useState([]);
  const [staff, setStaff] = useState([]);

  const navigate = useNavigate();

  const [formState, setFormState] = useState({
    store_name: "",
    manager_staff_id: "",
    address_id: "",
  });

  useEffect(() => {
    loadAddress();
    loadStaff();
  }, []);

  const loadAddress = async () => {
    try {
      const response = await axios.get('http://localhost:3100/api/v1/tbdprojectdatabase/address');
      setAddress(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const loadStaff = async () => {
    try {
      const response = await axios.get('http://localhost:3100/api/v1/tbdprojectdatabase/staff');
      setStaff(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const [errors, setErrors] = useState("");

  const validateForm = () => {
    const {  store_name, manager_staff_id, address_id} = formState;
    if (store_name && manager_staff_id && address_id) {
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
  
    axios.post('http://localhost:3100/api/v1/tbdprojectdatabase/stores', formState)
      .then(response => {
        console.log(response.data);
        closeModal();
        navigate('/store-page');
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
            <label htmlFor="store_name" className="font-semibold">
              Store Name
            </label>
            <input
              name="store_name"
              onChange={handleChange}
              value={formState.store_name}
              className="border border-black rounded-md p-1 text-base"
            />
          </div>
          <div className="flex flex-col mb-4">
              <label htmlFor="manager_staff_id" className="font-semibold">
              Staff Manager
            </label>
            <select
              name="manager_staff_id"
              onChange={handleChange}
              value={formState.manager_staff_id}
              className="border border-black rounded-md p-1 text-base"
            >
            <option value="">Select Staff Manager</option>
          {staff.map(staff => (
            <option key={staff.staff_id} value={staff.staff_id}>
              {staff.staff_name}
            </option>
          ))}
        </select>
      </div>
          <div className="flex flex-col mb-4">
              <label htmlFor="address_id" className="font-semibold">
              Store Address
            </label>
            <select
              name="address_id"
              onChange={handleChange}
              value={formState.address_id}
              className="border border-black rounded-md p-1 text-base"
            >
            <option value="">Select Address</option>
          {address.map(address => (
            <option key={address.address_id} value={address.address_id}>
              {address.address_name}
            </option>
          ))}
        </select>
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
