const pool = require('../../db');
const queries = require('../queries/publisher');


const getPublishers = (req,res) =>{
    pool.query(queries.getPublishers, (error, result) =>{
        if(error) throw error;
        res.status(200).json(result.rows);
    })
    }

const getPublisherById = (req, res) => {
    const publisher_id = parseInt(req.params.publisher_id);
    if (isNaN(publisher_id)) {
        return res.status(400).json({ message: "Invalid Author ID" });
    }
    pool.query(queries.getPublisherById, [publisher_id], (error, result) => {
        if (error) {
            throw error;
        }
        res.status(200).json(result.rows);
    });
};

const addPublishers = async (req, res) => {
    const { publisher_name, telephone } = req.body;
    try {
      const result = await pool.query(queries.checkNamexists, [publisher_name]);
      if (result.rows.length) {
        res.send("Publisher already exists");
      } else {
        await pool.query(queries.addPublishers, [publisher_name, telephone]);
        res.status(200).send("Successfully added publishers");
      }
    } catch (error) {
      throw error;
    }
  };

  const deletePublisherById = (req, res) => {
    const publisher_id = parseInt(req.params.publisher_id);
    pool.query(queries.deletePublisherById, [publisher_id], (error, result) => {
      if (error) throw error;
      res.status(200).send("Successfully deleted publisher");
    });
  };
  

  const updatePublisherById = async (req, res) => {
    const publisher_id = parseInt(req.params.publisher_id);
    const { publisher_name, telephone } = req.body;
  
    try {
      await pool.query(queries.updatePublisherById, [publisher_id, publisher_name, telephone]);
      res.status(200).send("Successfully updated publisher");
    } catch (error) {
      throw error;
    }
  };
  
module.exports ={
    getPublishers,
    getPublisherById,
    addPublishers,
    deletePublisherById,
    updatePublisherById,
}