import './App.css';
import React, { Component }  from 'react';
import {useState} from "react";
import Axios from 'axios';


function App() {
  const [itemName, setItemName] = useState("");
  const [storageLocation, setStorageLocation] = useState("");
  const currDateTime = new Date().toLocaleString()

  const addItem = () => {
    document.getElementById('nameInput').value = ''
    document.getElementById('locationInput').value = ''
    console.log(itemName)
    Axios.post('http://localhost:3001/create', {
      itemName: itemName,
      storageLocation: storageLocation,
      dateStored: currDateTime,
      dateRemoved: 'null'
    }).then(() => {
      console.log("Successfully passed to backend!")
    })
  };
  return (
    <div className="App">
      <h1>Inventory Database</h1>
      <div className='centerBox'>
        <div className='inputForm'>
          <div className='item-names'>      
            <label>Item Name:</label>
            <label>Storage Location:</label>
          </div>
          <div className='inputs'>
            <input ID="nameInput" type="text" onChange={(event) =>{setItemName(event.target.value)}}/>
            
            <input ID="locationInput"type="text" onChange={(event) =>{setStorageLocation(event.target.value)}}/>
          </div>
          <button onClick={addItem}>Add Item</button>
        </div>
      </div>       
    </div>
  );
}

export default App;
