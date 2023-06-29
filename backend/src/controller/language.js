const pool = require('../../db');
const queries = require('../queries/language');


const getLanguages = (req,res) =>{
    pool.query(queries.getLanguages, (error, result) =>{
        if(error) throw error;
        res.status(200).json(result.rows);
    })
    }

const getLanguageById = (req, res) => {
    const language_id = parseInt(req.params.language_id);
    if (isNaN(language_id)) {
        return res.status(400).json({ message: "Invalid Language ID" });
    }
    pool.query(queries.getLanguageById, [language_id], (error, result) => {
        if (error) {
            throw error;
        }
        res.status(200).json(result.rows);
    });
};

const addLanguages = async (req, res) => {
    const { language_name, last_update } = req.body;
    try {
      const result = await pool.query(queries.checkNamexists, [language_name]);
      if (result.rows.length) {
        res.send("Language already exists");
      } else {
        await pool.query(queries.addLanguages, [language_name, last_update]);
        res.status(200).send("Successfully Added Language");
      }
    } catch (error) {
      throw error;
    }
  };

  const deleteLanguageById = (req, res) => {
    const language_id = parseInt(req.params.language_id);
    pool.query(queries.deleteLanguageById, [language_id], (error, result) => {
      if (error) throw error;
      res.status(200).send("Successfully deleted language");
    });
  };
  

  const updateLanguageById = async (req, res) => {
    const language_id = parseInt(req.params.language_id);
    const { language_name, last_update } = req.body;
  
    try {
      await pool.query("BEGIN")
      await pool.query("SAVEPOINT update_language")
      await pool.query(queries.updateLanguageById, [language_id, language_name, last_update]);
      await pool.query ("COMMIT")
      res.status(200).send("Successfully Updated Language");
    } catch (error) {
      await pool.query("ROLLBACK")
      throw error;
    }
  };
  
module.exports ={
    getLanguages,
    getLanguageById,
    addLanguages,
    deleteLanguageById,
    updateLanguageById,
}