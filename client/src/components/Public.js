import React, { useEffect, useState } from "react";
import Axios from "axios";

export default function Courses() {

  const [results, setResults] = useState([]);

  useEffect(() => {
    
    Axios.get('http://localhost:5000')
      .then(data => setResults(data.data.message));
        
  }, [])


  return (
    <div className="bounds">
      <div className="grid-100">
        <h1>Welcome to the Main Page</h1>
        <h2>{results}</h2>
      </div>
    </div>
  );
}
