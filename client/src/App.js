import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Table from "react-bootstrap/Table";

function App() {
  const [foodName, setFoodName] = useState("");
  const [days, setDays] = useState(0);
  const [listFood, setListFood] = useState([]);
  const [newFoodName, setNewFoodName] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/read").then((res) => {
      setListFood(res.data);
    });
  }, []);

  const addToList = () => {
    axios.post("http://localhost:3001/insert", {
      foodName: foodName,
      days: days,
    });
  };

  const updateFood = (id) => {
    axios.put("http://localhost:3001/update", {
      id: id,
      newFoodName: newFoodName,
    });
  };
  const deleteFood = (id) => {
    axios.delete(`http://localhost:3001/delete/${id}`);
  };

  return (
    <div className="App">
      <h1>CRUD APP</h1>
      <label>Food Name: </label>
      <input
        type="text"
        onChange={(e) => {
          setFoodName(e.target.value);
        }}
      ></input>
      <label>Days Since You Ate It: </label>
      <input
        type="text"
        onChange={(e) => {
          setDays(e.target.value);
        }}
      ></input>
      <button onClick={addToList}>Add To List</button>

      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>id</th>
            <th>Food Name</th>
            <th>Set Name</th>
            <th>daysSinceIAte</th>
            <th>UPDATE</th>
            <th>DELETE</th>
          </tr>
        </thead>
        <tbody>
          {listFood &&
            listFood.map((value, key) => (
              <tr key={key}>
                <td>{value._id}</td>
                <td>{value.foodName}</td>
                <td>
                  <input
                    type="text"
                    placeholder="New Food Name..."
                    onChange={(e) => setNewFoodName(e.target.value)}
                  />
                </td>
                <td>{value.daysSinceIAte}</td>
                <td>
                  <button onClick={() => updateFood(value._id)}>UPDATE</button>
                </td>
                <td>
                  <button onClick={() => deleteFood(value._id)}>DELETE</button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
}

export default App;
