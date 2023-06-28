import React, {Fragment, useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BookPage } from "./BookPage";

export const EditBook = ({Book}) => {
    console.log(Book);

    const navigate = useNavigate()
    const book_id = parseInt(Book.book_id);
    const [book_title, setBookTitle] = useState(Book.book_title);
    const [description, setDescription] = useState(Book.description);
    const [release_year, setReleaseYear] = useState(Book.release_year);
    const [language_id, setLanguageId] = useState(Book.language_id);
    const [book_price, setBookPrice] = useState(Book.book_price);
    const [publisher_id, setPublisherId] = useState(Book.publisher_id);
    const [category_id, setCategoryId] = useState(Book.category_id);
    const [author_id, setAuthorId] = useState(Book.author_id);

    const editBook = async (book_id) => {
        try {
            const body = {
                book_id: book_id,
                book_title: book_title,
                description: description,
                release_year: release_year,
                language_id: language_id,
                book_price: book_price,
                publisher_id: publisher_id,
                category_id: category_id,
                author_id: author_id,
                
            };
            axios.put(`http://localhost:3100/api/v1/tbdprojectdatabase/books/${book_id}`, body)
            .then(response => {
              console.log(response.data);
              navigate('/book-page');
              window.location.reload();
            })
            .catch(error => {
              console.error(error);
            
            })
            // Handle the response as needed
        } catch (err) {
            console.error(err.message);
        }
    };



    return(
        <Fragment>
            <button data-toggle="modal" data-target={`#id${Book.book_id}`}>Edit</button>
            
            <div class="modal" id={`id${Book.book_id}`}>
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title">Edit Book</h4>
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                        </div>

                        <div class="modal-body">
                            <div class="title" className="d-flex">
                                <h2>Title:</h2>
                                <input type="text" value={book_title} onChange={e => setBookTitle(e.target.value)}/>
                            </div>
                            <div class="description" className="d-flex">
                                <h2>Description:</h2>
                                <input type="text" value={description} onChange={e => setDescription(e.target.value)}/>
                            </div>
                            <div class="release_year" className="d-flex">
                                <h2>Release Year:</h2>
                                <input type="number" value={release_year} onChange={e => setReleaseYear(e.target.value)}/>
                            </div>
                            <div class="language_id" className="d-flex">
                                <h2>Language Id:</h2>
                                <input type="number" value={language_id} onChange={e => setLanguageId(e.target.value)}/>
                            </div>
                            <div class="book_price" className="d-flex">
                                <h2>Book Price:</h2>
                                <input type="number" value={book_price} onChange={e => setBookPrice(e.target.value)}/>
                            </div>
                        </div>
                        <div class="publisher_id" className="d-flex">
                                <h2>Publisher Id:</h2>
                                <input type="number" value={publisher_id} onChange={e => setPublisherId(e.target.value)}/>
                            </div>
                        <div class="category_id" className="d-flex">
                                <h2>Category Id:</h2>
                                <input type="number" value={category_id} onChange={e => setCategoryId(e.target.value)}/>
                        </div>
                        <div class="author_id" className="d-flex">
                                <h2>Author Id:</h2>
                                <input type="number" value={author_id} onChange={e => setAuthorId(e.target.value)}/>
                        </div>
                        <div class="modal-footer">
                            <button type="button" data-dismiss="modal" onClick={() => editBook(book_id)}>Save</button>
                        </div>
                        <div class="modal-footer">
                            <button type="button" data-dismiss="modal" onClick={()=>window.location.reload()}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    ) 
};

