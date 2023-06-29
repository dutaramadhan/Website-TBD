const pool = require('../../db');
const queries = require('../queries/store');


const getStores = (req,res) =>{
    pool.query(queries.getStores, (error, result) =>{
        if(error) throw error;
        res.status(200).json(result.rows);
    })
    }

const getStoreById = (req, res) => {
    const store_id = parseInt(req.params.store_id);
    if (isNaN(store_id)) {
        return res.status(400).json({ message: "Invalid Store ID" });
    }
    pool.query(queries.getStoreById, [store_id], (error, result) => {
        if (error) {
            throw error;
        }
        res.status(200).json(result.rows);
    });
};

const addStores = async (req, res) => {
    const { store_name, manager_staff_id, address_id } = req.body;
    try {
      const result = await pool.query(queries.checkNamexists, [store_name]);
      if (result.rows.length) {
        res.send("Store already exists");
      } else {
        await pool.query(queries.addStores, [store_name, manager_staff_id, address_id]);
        res.status(200).send("Successfully added stores");
      }
    } catch (error) {
      throw error;
    }
  };

  const deleteStoreById = (req, res) => {
    const store_id = parseInt(req.params.store_id);
    pool.query(queries.deleteStoreById, [store_id], (error, result) => {
      if (error) throw error;
      res.status(200).send("Successfully deleted store");
    });
  };
  

  const updateStoreById = async (req, res) => {
    const store_id = parseInt(req.params.store_id);
    const { store_name, manager_staff_id, address_id } = req.body;
  
    try {
      await pool.query(queries.updateStoreById, [store_id, store_name, manager_staff_id, address_id]);
      res.status(200).send("Successfully updated store");
    } catch (error) {
      throw error;
    }
  };
  
module.exports ={
    getStores,
    getStoreById,
    addStores,
    deleteStoreById,
    updateStoreById,
}