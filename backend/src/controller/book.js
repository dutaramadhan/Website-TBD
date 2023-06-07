const pool = require('../../db');
const queries = require('../queries/book');

const getBooks = (req,res) =>{
pool.query(queries.getBooks, (error, result) =>{
    if(error) throw error;
    res.status(200).json(result.rows);
})
}

const getBookById = (req, res) => {
    const book_id = parseInt(req.params.book_id);
    if (isNaN(book_id)) {
        return res.status(400).json({ message: "Invalid book ID" });
    }
    pool.query(queries.getBookById, [book_id], (error, result) => {
        if (error) {
            throw error;
        }
        res.status(200).json(result.rows);
    });
};

const addBooks = (req, res) =>{
    const {book_title, description, release_year, language_id, book_price} = req.body;
    //check if email exists
    pool.query(queries.checkTitleExists, [book_title],(error, result) => {
        if(result.rows.length){
            res.send("Book already exists")
        }
        else{
         //add book to db
        pool.query(queries.addBooks, [book_title, description, release_year, language_id, book_price],(error,result)=>{
            if(error) throw error;
            res.status(201).send("Book Created Successfully");
        })}
    })
}

const deleteBookById = (req, res) =>{
    const book_id =parseInt(req.params.book_id)
    pool.query(queries.getBookById, [book_id], (error,result)=>{
        const noBookFound = !result.rows.length;
        if(noBookFound){
            res.send("Book does not exist in the database");
        }
        else{
            pool.query(queries.deleteBookById, [book_id], (error,result)=>{
                if(error) throw error;
                res.status(201).send("Book deleted Successfully")
            })
        }  
    })
}

const updateBookById = (req, res) => {
    const book_id = parseInt(req.params.book_id);
    const {book_title, description, release_year, language_id, book_price} = req.body;
    console.log(book_title);
  
    pool.query(queries.getBookById, [book_id], (error, result) => {
        if (error) {
            throw error;
        }
        
        if (result.rows.length === 0) {
            return res.send("Book does not exist in the database");
        }
        
        pool.query(
            queries.updateBookById,
            [book_id, book_title, description, release_year, language_id, book_price],
            (error, result) => {
                if (error) {
                    throw error;
                }
                res.status(201).send("Book Updated Successfully");
            }
        );
    });
};

module.exports ={
    getBooks,
    getBookById,
    addBooks,
    deleteBookById,
    updateBookById,
}