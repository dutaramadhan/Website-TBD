const pool = require('../../db');
const queries = require('../queries/staff');


const getStaff = (req,res) =>{
    pool.query(queries.getStaff, (error, result) =>{
        if(error) throw error;
        res.status(200).json(result.rows);
    })
    }

const getStaffById = (req, res) => {
    const staff_id = parseInt(req.params.staff_id);
    if (isNaN(staff_id)) {
        return res.status(400).json({ message: "Invalid Staff ID" });
    }
    pool.query(queries.getStaffById, [staff_id], (error, result) => {
        if (error) {
            throw error;
        }
        res.status(200).json(result.rows);
    });
};

const addStaff = async (req, res) => {
    const { staff_name, address_id, email, store_id, active, username, password } = req.body;
    try {
      const result = await pool.query(queries.checkNamexists, [staff_name]);
      if (result.rows.length) {
        res.send("Staff already exists");
      } else {
        await pool.query(queries.addStaff, [staff_name, address_id, email, store_id, active, username, password]);
        res.status(200).send("Successfully added staff");
      }
    } catch (error) {
      throw error;
    }
  };

  const deleteStaffById = (req, res) => {
    const staff_id = parseInt(req.params.staff_id);
    pool.query(queries.deleteStaffById, [staff_id], (error, result) => {
      if (error) throw error;
      res.status(200).send("Successfully deleted staff");
    });
  };
  

  const updateStaffById = async (req, res) => {
    const staff_id = parseInt(req.params.staff_id);
    const { staff_name, address_id, email, store_id, active, username, password} = req.body;
  
    try {
      await pool.query(queries.updateStaffById, [staff_id, staff_name, address_id, email, store_id, active, username, password]);
      res.status(200).send("Successfully updated staff");
    } catch (error) {
      throw error;
    }
  };
  
module.exports ={
    getStaff,
    getStaffById,
    addStaff,
    deleteStaffById,
    updateStaffById,
}