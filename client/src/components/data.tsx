import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Create an instance of axios with a timeout
const axiosInstance = axios.create({
  timeout: 10000 // 10 seconds
});

interface Props {
  data: any[];
}

function AllData({ data }: Props) {
  const [receivedData, setReceivedData] = useState<any[]>([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    setReceivedData(data);
  }, [data]);

  const handleDelete = async (id: any) => {
    try {
      await axiosInstance.delete(`http://localhost:3001/crud/delete/${id}`);
      console.log(id);
      // Update receivedData after deletion
      setReceivedData(receivedData.filter((item) => item._id !== id));
    } catch (error:any) {
      setError(error.message);
    }
  };

  return (
    <div className="flex">
      {receivedData.map((val: any, index: number) => (
        <div className="data" key={val._id}>
          <h3>Name: {val.name}</h3>
          <p>Age: {val.age}</p>
          <div className="button">

            <button onClick={() => handleDelete(val._id)}>Delete</button>
          </div>
        </div>
      ))}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default AllData;