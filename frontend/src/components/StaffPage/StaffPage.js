import { useState } from "react";
import {useNavigate} from 'react-router-dom';


import { Table } from "./TableStaffPage";
import { Modal } from "./ModalStaffPage";

export function StaffPage(){
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(false);
  const [rows, setRows] = useState([
    {
      name: "Jane Cooper",
      address: "Pangkah",
      store: "Bantul",
      username: "duts",
      email: "jane.cooper@example.com",
      password: "duta2711"
    },
    {
      name: "John Doe",
      title: "Regional Paradigm Technician",
      department: "Optimization",
      username: "halo",
      email: "john.doe@example.com",
    },
    {
      name: "Veronica Lodge",
      title: "Regional Paradigm Technician",
      department: "Optimization",
      username: " sopo mbuh",
      email: "veronica.lodge@example.com",
    },
  ]);
  const [rowToEdit, setRowToEdit] = useState(null);
  const handleDeleteRow = (targetIndex) => {
    setRows(rows.filter((_, index) => index !== targetIndex));
  };

  const handleEditRow = (index) => {
    setRowToEdit(index);

    setModalOpen(true);
  };

  const handleSubmit = (newRow) => {
    rowToEdit === null
      ? setRows([...rows, newRow])
      : setRows(
          rows.map((currRow, index) => {
            if (index !== rowToEdit) return currRow;

            return newRow;
          })
        );
  };

  return (
    <>
      <div id="staffPage" className="justify-center items-center py-20 lg:py-10 px-3 lg:px-28 h-screen text-xl">
        <div> Tabel Staff
          <Table
            rows={rows}
            deleteRow={handleDeleteRow}
            editRow={handleEditRow}
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
              onSubmit={handleSubmit}
              defaultValue={rowToEdit !== null && rows[rowToEdit]}
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