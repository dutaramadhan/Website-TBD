import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { EditModal } from "./ModalEditPublisherPage";
import { useState, useEffect } from "react";

export const Table = ({ rows}) => {
  const navigate = useNavigate();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleEditModalOpen = (row) => {
    setSelectedRow(row);
    setEditModalOpen(true);
  }
  return (
    <>
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                  <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Publisher ID
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                       Publisher Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Telephone
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {rows.map((row, index) => (
                    <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {row.publisher_id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {row.publisher_name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {row.telephone}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a
                          href="#"
                          className="text-indigo-600 hover:text-indigo-900"
                          onClick={() => {
                            axios
                              .delete(`http://localhost:3100/api/v1/tbdprojectdatabase/publishers/${row.publisher_id}`)
                              .then((res) => {
                                navigate('/publisher-page');
                                window.location.reload();
                              })
                              .catch((err) => {
                                console.log(err);
                              });
                          }}
                        >
                          Delete
                        </a>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          href="#"
                          className="text-indigo-600 hover:text-indigo-900"
                          onClick={() => handleEditModalOpen(row)}
                        >
                          Edit
                        </button>
                        {editModalOpen && selectedRow===row &&(
                          <EditModal
                            Publisher= {row}
                            closeModal={() => {
                            setEditModalOpen(false);
                            setSelectedRow(null);
                          }}
                          />
                          )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
