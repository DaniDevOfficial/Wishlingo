import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';

function FetchData() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const database = getDatabase();
    const dataRef = ref(database); 
    onValue(dataRef, (snapshot) => {
      const fetchedData = snapshot.val();
      if (fetchedData) {
        const dataArray = Object.values(fetchedData);
        setData(dataArray);
        
        localStorage.setItem('fetchedData', JSON.stringify(dataArray));
      }
    });
  }, []);

  return (
    <div>
      <h1>Sentences and Translations</h1>
      <ul>
        {data.map((item, index) => (
          <li key={index}>
            <p>Topic: {item.topic}</p>
            <p>Sentence: {item.sentencePart1} {item.sentencePart2}</p>
            <p>Translation: {item.translation}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FetchData;
