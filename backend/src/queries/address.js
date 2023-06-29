const getAddress = `SELECT * FROM address`
const getAddressById = 'SELECT * FROM address WHERE address_id= $1'
const checkNamexists = `SELECT a FROM address a WHERE a.address_name = $1`
const addAddress = `INSERT INTO address (address_name, postal_code) VALUES ($1, $2)`
const deleteAddressById = `DELETE FROM address WHERE address_id = $1`
const updateAddressById = `UPDATE address
SET address_name = $2, postal_code = $3
WHERE address_id = $1;`


module.exports = {
    getAddress,
    getAddressById,
    checkNamexists,
    addAddress,
    deleteAddressById,
    updateAddressById,
}