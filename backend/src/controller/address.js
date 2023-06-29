const pool = require('../../db');
const queries = require('../queries/address');


const getAddress = (req,res) =>{
    pool.query(queries.getAddress, (error, result) =>{
        if(error) throw error;
        res.status(200).json(result.rows);
    })
    }

const getAddressById = (req, res) => {
    const address_id = parseInt(req.params.address_id);
    if (isNaN(address_id)) {
        return res.status(400).json({ message: "Invalid Address ID" });
    }
    pool.query(queries.getAddressById, [address_id], (error, result) => {
        if (error) {
            throw error;
        }
        res.status(200).json(result.rows);
    });
};

const addAddress = async (req, res) => {
    const { address_name, postal_code } = req.body;
    try {
      const result = await pool.query(queries.checkNamexists, [address_name]);
      if (result.rows.length) {
        res.send("Address already exists");
      } else {
        await pool.query(queries.addAddress, [address_name, postal_code]);
        res.status(200).send("Successfully Added Address");
      }
    } catch (error) {
      throw error;
    }
  };

  const deleteAddressById = (req, res) => {
    const address_id = parseInt(req.params.address_id);
    pool.query(queries.deleteAddressById, [address_id], (error, result) => {
      if (error) throw error;
      res.status(200).send("Successfully Deleted Address");
    });
  };
  

  const updateAddressById = async (req, res) => {
    const address_id = parseInt(req.params.address_id);
    const { address_name, postal_code } = req.body;
  
    try {
      await pool.query("BEGIN")
      await pool.query("SAVEPOINT update_address")
      await pool.query(queries.updateAddressById, [address_id, address_name, postal_code]);
      await pool.query ("COMMIT")
      res.status(200).send("Successfully Updated Address");
    } catch (error) {
      await pool.query("ROLLBACK")
      throw error;
    }
  };
  
module.exports ={
    getAddress,
    getAddressById,
    addAddress,
    deleteAddressById,
    updateAddressById,
}