const sqlite3 = require('sqlite3').verbose();
require('dotenv').config();

const databasePath = './db/main.db';
let connection;
new Promise((resolve, reject) => {
    connection = new sqlite3.Database(databasePath, (err) => {
        if (err == null) {
            console.log(`Database: ${databasePath} connected!`);
            resolve("connectDB promise ok");
        } else {
            console.log(`Database: ${databasePath} connection failed!`);
            console.log(err);
            reject("connectDB promise fail");
        }
    })
}).then((result) =>{
    console.log(result);
    connection.all(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        username VARCHAR(50) NOT NULL,
        email VARCHAR(50) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`);

    connection.all(`CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        name VARCHAR(50) NOT NULL,
        description TEXT(300) NOT NULL,
        price INTEGER NOT NULL,
        stock INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        deleted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`);
});
module.exports = connection;