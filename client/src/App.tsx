import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import AllData from './components/data';

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/crud/read");
        setData(response.data);
      } catch (error:any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const sendToDb = async () => {
    try {
      await axios.post("http://localhost:3001/crud", {
        name,
        age,
      });
      setName("");
      setAge(0);
      // Refresh data after adding new item
      const response = await axios.get("http://localhost:3001/crud/read");
      setData(response.data);
    } catch (error:any) {
      setError(error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div className="App">
        <h1>CRUD APP</h1>
        <input
          type="text"
          placeholder="Enter your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Enter your Age"
          value={age}
          onChange={(e) => setAge(e.target.valueAsNumber)}
        />
        <button className="app" onClick={sendToDb}>Add to List</button>
      </div>
      {data && <AllData data={data}/>}
    </div>
  );
}

export default App;