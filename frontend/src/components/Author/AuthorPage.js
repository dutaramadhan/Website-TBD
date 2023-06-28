import { useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom';
import axios from 'axios';


import { Table } from "../Author/TableAuthorPage";
import { Modal } from "./ModalAuthorPage";

export function AuthorPage(){
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(false);
    const [author, setAuthor] = useState([]);

  useEffect(()=>{
    const url = 'http://localhost:3100/api/v1/tbdprojectdatabase/authors'
    axios.get(url)
    .then(response =>{
      console.log(response.data);
      setAuthor(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
  },[]);
  
  const [rowToEdit, setRowToEdit] = useState(null);
  const handleDeleteRow = (targetIndex) => {
    setAuthor(author.filter((_, index) => index !== targetIndex));
  };

  const handleEditRow = (index) => {
    setRowToEdit(index);

    setModalOpen(true);
  };


  return (
    <>
      <div id="staffPage" className="justify-center items-center py-20 lg:py-10 px-3 lg:px-28 h-screen text-xl">
        <div> Tabel Penulis
          <Table
            rows={author}
          />
          <button
            onClick={() => setModalOpen(true)}
            className="mt-4 mx-auto border-none bg-blue-600 text-white py-2 px-4 rounded-lg cursor-pointer shadow-md text-base"
          > 
            Add
          </button>
          {modalOpen && (
            <Modal
              closeModal={() => {
                setModalOpen(false);
                setRowToEdit(null);
              }}
            />
          )}
        </div>
        <button  onClick={()=> navigate('/')} className="mt-4 mx-auto border-none bg-blue-600 text-white py-2 px-4 rounded-lg cursor-pointer shadow-md text-base fixed bottom-8 right-5 m-2 p-4">
  Home
</button>
      </div>
    </>
  );
}