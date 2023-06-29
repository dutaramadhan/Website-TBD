const getStaff = `SELECT staff.*, address.address_name, store.store_name FROM staff
INNER JOIN store ON staff.store_id = store.store_id
INNER JOIN address ON staff.address_id = address.address_id`
const getStaffById = `SELECT staff.*, address.address_name, store.store_name FROM staff
INNER JOIN store ON staff.store_id = store.store_id
INNER JOIN address ON staff.address_id = address.address_id
WHERE staff.staff_id = $1`
const checkNamexists = `SELECT s FROM staff s WHERE s.staff_name = $1`
const addStaff = `INSERT INTO staff (staff_name, address_id, email, store_id, active, username, password) VALUES ($1, $2, $3, $4, $5, $6, $7)`
const deleteStaffById = `DELETE FROM staff WHERE staff_id = $1`
const updateStaffById = `UPDATE staff
SET staff_name = $2, address_id = $3, email = $4, store_id = $5, active = $6, username = $7, password = $8
WHERE staff_id = $1;`


module.exports = {
    getStaff,
    getStaffById,
    checkNamexists,
    addStaff,
    deleteStaffById,
    updateStaffById,
}