import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [objects, setObjects] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4040/objetos/all") // Cambia la URL según corresponda a tu API
      .then(response => {
        setObjects(response.data); // Almacena los datos en el estado
      })
      .catch(error => {
        console.error("Error fetching data:", error); // Muestra el error en consola
      });
  }, []);

  return (
    <div>
      <h1>Lista de Objetos</h1>
      <ul>
        {objects.map((obj, index) => (
          <li key={index}>{obj.nombre}</li> // Muestra cada objeto en la lista
        ))}
      </ul>
    </div>
  );
};

export default App;
