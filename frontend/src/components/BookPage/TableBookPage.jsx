import React from "react";
import axios from "axios";
import {EditModal} from "./ModalEditBookPage "
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";


export const Table = ({ rows, deleteRow, editRow }) => {

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const navigate = useNavigate();
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
                      Title
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Description
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Author
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Publisher
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Category
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Release Year
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Language
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {rows.map((row, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {row.book_title}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {row.description}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {row.author_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {row.publisher_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {row.category_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {row.release_year}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {row.language_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {row.book_price}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a
                          href="#"
                          className="text-indigo-600 hover:text-indigo-900"
                          onClick={() => {
                            axios
                              .delete(`http://localhost:3100/api/v1/tbdprojectdatabase/books/${row.book_id}`)
                              .then((res) => {
                                navigate('/book-page');
                                window.location.reload(); 
                              })
                              .catch((err) => {
                                console.log(err);
                              });
                              navigate('/book-page')
                              window.location.reload(); 
                          }}
                        >
                          Delete
                        </a>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">

                      <button
                          className="text-indigo-600 hover:text-indigo-900"
                          onClick={() => handleEditModalOpen(row)}    
                      >
                      Edit
                      </button>
                          {editModalOpen && selectedRow===row &&(
                          <EditModal
                            Book= {row}
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
