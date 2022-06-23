const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')

const connection = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'password',
    database: 'inventoryDatabase'
})

app.use(cors());
app.use(express.json());

app.post('/create', (req, res) => {
    console.log(req.body)
    const itemName = req.body.itemName
    const storageLocation = req.body.storageLocation
    const dateStored = req.body.dateStored
    const dateRemoved = req.body.dateRemoved

    connection.query(
        "INSERT INTO inventory (itemName, storageLocation, dateStored, dateRemoved) VALUES (?, ?, ?, ?)",
        [itemName, storageLocation, dateStored, dateRemoved], 
        (err, res) => {
            if (err) {
                console.log(err)
            } else {
                res.send("Values Inserted")
            }
        }
    )
})

app.get("/items", (req, res) => {
    connection.query("SELECT * FROM inventory", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
});

app.listen(3001, ()=> {
    console.log("Running!");
})