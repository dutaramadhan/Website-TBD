const pool = require('../../db');
const queries = require('../queries/category');


const getCategories = (req,res) =>{
    pool.query(queries.getCategories, (error, result) =>{
        if(error) throw error;
        res.status(200).json(result.rows);
    })
    }

const getCategoryById = (req, res) => {
    const category_id = parseInt(req.params.category_id);
    if (isNaN(category_id)) {
        return res.status(400).json({ message: "Invalid Category ID" });
    }
    pool.query(queries.getCategoryById, [category_id], (error, result) => {
        if (error) {
            throw error;
        }
        res.status(200).json(result.rows);
    });
};

const addCategories = async (req, res) => {
    const { category_name } = req.body;
    try {
      const result = await pool.query(queries.checkNamexists, [category_name]);
      if (result.rows.length) {
        res.send("Category already exists");
      } else {
        await pool.query(queries.addCategories, [category_name]);
        res.status(200).send("Successfully added category");
      }
    } catch (error) {
      throw error;
    }
  };

  const deleteCategoryById = (req, res) => {
    const category_id = parseInt(req.params.category_id);
    pool.query(queries.deleteCategoryById, [category_id], (error, result) => {
      if (error) throw error;
      res.status(200).send("Successfully deleted category");
    });
  };
  

  const updateCategoryById = async (req, res) => {
    const category_id = parseInt(req.params.category_id);
    const { category_name } = req.body;
  
    try {
      await pool.query("BEGIN")
      await pool.query("SAVEPOINT update_category")
      await pool.query(queries.updateCategoryById, [category_id, category_name]);
      await pool.query ("COMMIT")
      res.status(200).send("Successfully updated publisher");
    } catch (error) {
      await pool.query("ROLLBACK")
      throw error;
    }
  };
  
module.exports ={
    getCategories,
    getCategoryById,
    addCategories,
    deleteCategoryById,
    updateCategoryById,
}