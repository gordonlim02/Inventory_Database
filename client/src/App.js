import './App.css';
import React, { Component }  from 'react';
import {useState} from "react";
import Axios from 'axios';
import $ from 'jquery';

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

  const displayItems = () => {
    Axios.get("http://localhost:3001/items").then((response) => {
      console.log(response);
      let res = '';
      response.data.forEach(data => {
        res += 
        `<tr>
          <td>${data.id}</td>
          <td>${data.itemName}</td>
          <td>${data.storageLocation}</td>
          <td>${data.dateStored}</td>
          <td>${data.date}</td>
        </tr>`
      });
      $('#place-here').html(res);
    });
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
            <input id="nameInput" type="text" onChange={(event) =>{setItemName(event.target.value)}}/>
            
            <input id="locationInput"type="text" onChange={(event) =>{setStorageLocation(event.target.value)}}/>
          </div>
          <button onClick={addItem}>Add Item</button>
          <button onClick={displayItems}>View Database</button>
        </div>
        <table>
          <thead>
            <th>ID</th>
            <th>Item Name</th>
            <th>Storage Location</th>
            <th>Date Stored</th>
            <th>Date Removed</th>
          </thead>
          <tbody id="place-here"></tbody>
        </table> 
      </div> 
    </div>
  );
}

export default App;
