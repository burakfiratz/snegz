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
});
module.exports = connection;