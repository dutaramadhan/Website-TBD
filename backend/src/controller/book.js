const pool = require('../../db');
const queries = require('../queries/book');

const knex = require("knex");
const db = knex({
    client: "pg",
    connection: {
      host: 'localhost',
      user: 'postgres',
      password: 'duta2711',
      database: 'tbdprojectdatabase',
    },
  });

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


const addBooks = async (req, res) => {
    const { book_title, description, release_year, language_id, book_price, author_id, publisher_id, category_id } = req.body;

    try {
        const result = await pool.query(queries.checkTitleExists, [book_title]);
        if (result.rows.length) {
            res.send("Book already exists");
        } else {
            // Add book to db
            await pool.query(queries.addBooks, [book_title, description, release_year, language_id, book_price, publisher_id]);
            
            await pool.query(queries.bookAuthorQuery, [book_title, author_id]);
            await pool.query(queries.bookCategoryQuery, [book_title, category_id]);

            res.status(201).send("Book Created Successfully");
        }
    } catch (error) {
        res.status(500).send(error);
    }
};



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

const updateBookById = async (req, res) => {
  const { book_id } = req.params;
  const { book_title, description, release_year, language_id, book_price, author_id, publisher_id, category_id } = req.body;

  if (!book_title || !release_year || !language_id || !book_price || !author_id || !publisher_id || !category_id) {
    return res.status(400).json("Incorrect form submission");
  }
  
  let trx;
  try {
    trx = await db.transaction();

    const bookQuery = `
      UPDATE book
      SET book_title = $1, description = $2, release_year = $3, language_id = $4, book_price = $5
      WHERE book_id = $6`;

    const bookAuthorQuery = `
      UPDATE book_author
      SET author_id = $1
      WHERE book_id = $2`;

    const bookCategoryQuery = `
      UPDATE book_category
      SET category_id = $1
      WHERE book_id = $2`;

    const values = [book_title, description, release_year, language_id, book_price, book_id];

    await pool.query(bookQuery, values);
    await pool.query(bookAuthorQuery, [author_id, book_id]);
    await pool.query(bookCategoryQuery, [category_id, book_id]);

    await trx.commit();

    res.status(200).json({ message: "Book updated successfully" });
  } catch (err) {
    console.error(err);
    if (trx) {
      await trx.rollback();
    }
    res.status(500).json({ error: "Error updating book" });
  }
};


//  const updateBookById = async (req, res) => {
//     const { book_id } = req.params;
//     const { book_title, description, release_year, language_id, book_price, author_id, publisher_id, category_id } =
//       req.body;
//     if (!book_title || !release_year || !language_id || !book_price || !author_id || !publisher_id || !category_id) {
//       return res.status(400).json("Incorrect form submission");
//     }
//     let trx;
//     try {
//       trx = await db.transaction();
//       const bookQuery = `
//   UPDATE book
//   SET book_title = $1, description = $2, release_year = $3, language_id = $4, book_price = $5
//   WHERE book_id = $6`;
// const bookAuthorQuery = `
//   UPDATE book_author
//   SET author_id = $1
//   WHERE book_id = $2`;
// const bookCategoryQuery = `
//   UPDATE book_category
//   SET category_id = $1
//   WHERE book_id = $2`;

// const values = [book_title, description, release_year, language_id, book_price, book_id];

// await pool.query(bookQuery, values);
// await pool.query(bookAuthorQuery, [author_id, book_id]);
// await pool.query(bookCategoryQuery, [category_id, book_id]);

//       res.status(200).json({ message: "Book updated successfully" });
//       return;
//     } catch (err) {
//       console.error(err);
//       if (trx) {
//         await trx.rollback();
//       }
//       res.status(500).json({ error: "Error updating book" });
//     }
//   };
module.exports ={
    getBooks,
    getBookById,
    addBooks,
    deleteBookById,
    updateBookById,
}