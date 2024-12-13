import React, { useEffect, useState } from "react";
import axios from "axios";

// Define la interfaz para los objetos
interface Object {
  id: string;
  name: string;
}

const App = () => {
  const [objects, setObjects] = useState<Object[]>([]);

  // Función para obtener los objetos desde el backend
  const fetchObjects = () => {
    axios
      .get("http://localhost:4040/objetos/all")
      .then((response) => setObjects(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  };

  useEffect(() => {
    fetchObjects();
  }, []);

  // Función para manejar la edición de un objeto
  const handleEdit = (object: Object) => {
    const newName = prompt("Nuevo nombre:", object.name);
    if (newName) {
      axios
        .put(`http://localhost:4040/objetos/update/${object.id}`, {
          ...object,
          name: newName,
        })
        .then(() => fetchObjects())
        .catch((error) => console.error("Error updating object:", error));
    }
  };

  // Función para manejar el borrado de un objeto
  const handleDelete = (object: Object) => {
    axios
      .delete(`http://localhost:4040/objetos/borrar/${object.id}`)
      .then(() => fetchObjects())
      .catch((error) => console.error("Error deleting object:", error));
  };

  // Función para manejar la adición de un nuevo objeto
  const handleAdd = () => {
    const name = prompt("Nombre del nuevo objeto:");
    if (name) {
      axios
        .post("http://localhost:4040/objetos/save", { name })
        .then(() => fetchObjects())
        .catch((error) => console.error("Error adding object:", error));
    }
  };

  return (
    <div>
      <h1>Lista de Objetos</h1>
      <button onClick={handleAdd}>Agregar Objeto</button>
      <ul>
        {objects.map((obj) => (
          <li key={obj.id}>
            {obj.name}{" "}
            <button onClick={() => handleEdit(obj)}>Editar</button>
            <button onClick={() => handleDelete(obj)}>Borrar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
