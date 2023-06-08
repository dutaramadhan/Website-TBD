const pool = require('../../db');
const queries = require('../queries/author');


const getAuthors = (req,res) =>{
    pool.query(queries.getAuthors, (error, result) =>{
        if(error) throw error;
        res.status(200).json(result.rows);
    })
    }

const getAuthorById = (req, res) => {
    const author_id = parseInt(req.params.author_id);
    if (isNaN(author_id)) {
        return res.status(400).json({ message: "Invalid Author ID" });
    }
    pool.query(queries.getAuthorById, [author_id], (error, result) => {
        if (error) {
            throw error;
        }
        res.status(200).json(result.rows);
    });
};

const addAuthors = async (req, res) => {
    const { author_name, year_born, year_died } = req.body;
    try {
      const result = await pool.query(queries.checkNamexists, [author_name]);
      if (result.rows.length) {
        res.send("Author already exists");
      } else {
        await pool.query(queries.addAuthors, [author_name, year_born, year_died]);
        res.status(200).send("Successfully added authors");
      }
    } catch (error) {
      throw error;
    }
  };

  const deleteAuthorById = (req, res) => {
    const author_id = parseInt(req.params.author_id);
    pool.query(queries.deleteAuthorById, [author_id], (error, result) => {
      if (error) throw error;
      res.status(200).send("Successfully deleted author");
    });
  };
  

  const updateAuthorById = async (req, res) => {
    const author_id = parseInt(req.params.author_id);
    const { author_name, year_born, year_died } = req.body;
  
    try {
      await pool.query(queries.updateAuthorById, [author_id, author_name, year_born, year_died]);
      res.status(200).send("Successfully updated author");
    } catch (error) {
      throw error;
    }
  };
  
module.exports ={
    getAuthors,
    getAuthorById,
    addAuthors,
    deleteAuthorById,
    updateAuthorById,
}