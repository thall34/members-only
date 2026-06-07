const pool = require('./pool');

async function createUser(firstName, lastName, username, password) {
    await pool.query(
        `INSERT INTO users (first_name, last_name, username, password)
        VALUES ($1, $2, $3, $4)
        `, [firstName, lastName, username, password]
    );
};

async function getUserByName(username) {
    const { rows } = await pool.query(
        `SELECT * FROM users
        WHERE users.username = $1`, [username]
    );

    return rows[0];
};

async function getUserById(id) {
    const { rows } = await pool.query(
        `SELECT * FROM users
        WHERE users.user_id = $1`, [id]
    );

    return rows[0];
};

async function updateMember(id) {
    await pool.query(
        `UPDATE users
        SET membership = 'member'
        WHERE user_id = $1`, [id]
    );
};

async function updateAdmin(id) {
    await pool.query(
        `UPDATE users
        SET membership = 'admin'
        WHERE user_id = $1`, [id]
    );
};

async function getAllMessages() {
    const { rows } = await pool.query(
        `SELECT messages.message_id, messages.title, messages.text, messages.timestamp, 
        users.first_name AS first_name, users.last_name AS last_name
        FROM messages
        JOIN users
        ON messages.user_id = users.user_id
        ORDER BY timestamp`
    );

    return rows
};

async function addMessage(id, title, text) {
    const timestamp = new Date();
    await pool.query(
        `INSERT INTO messages (user_id, title, text, timestamp)
        VALUES ($1, $2, $3, $4)
        `, [id, title, text, timestamp]
    );
};

async function deleteMessage(id) {
    await pool.query(
        `DELETE FROM messages
        WHERE message_id = $1`, [id]
    );
};

module.exports = {
    createUser,
    getUserByName,
    getUserById,
    updateMember,
    updateAdmin,
    getAllMessages,
    addMessage,
    deleteMessage,
};