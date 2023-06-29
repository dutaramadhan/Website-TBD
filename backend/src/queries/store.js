const getStores = `SELECT store.*, address.address_name, staff.staff_name FROM store
INNER JOIN staff ON store.manager_staff_id = staff.staff_id
INNER JOIN address ON store.address_id = address.address_id`
const getStoreById = `SELECT store.*, address.address_name, staff.staff_name FROM store
INNER JOIN staff ON store.manager_staff_id = staff.staff_id
INNER JOIN address ON store.address_id = address.address_id
WHERE store.store_id = $1`
const checkNamexists = `SELECT s FROM store s WHERE s.store_name = $1`
const addStores = `INSERT INTO store (store_name, manager_staff_id, address_id) VALUES ($1, $2, $3)`
const deleteStoreById = `DELETE FROM store WHERE store_id = $1`
const updateStoreById = `UPDATE store
SET store_name = $2, manager_staff_id = $3, address_id = $4
WHERE store_id = $1;`


module.exports = {
    getStores,
    getStoreById,
    checkNamexists,
    addStores,
    deleteStoreById,
    updateStoreById,
}