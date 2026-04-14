//se importan los hooks y el css que vamos a usar
import React, { useState, useEffect } from "react";
import "./App.css";


function App() {
  const [users, setUsers] = useState([]); //array de usuarios
  const [skip, setSkip] = useState(0); //inicialmente, se saltan 0 usuarios
  const [loading, setLoading] = useState(false); //booleano de carga (desactivada)
  const limit = 10; //límite de salto

  const fetchUsers = async () => {
    setLoading(true); //carga activada
    try {
      const response = await fetch(`https://dummyjson.com/users?limit=${limit}&skip=${skip}`);
      const jsonResponse = await response.json();

      setUsers((prevUsers) => [...prevUsers, ...jsonResponse.users]); //se añaden usuarios al array
      setSkip((prevSkip) => prevSkip + limit); //se actualiza el límite de salto
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    } finally {
      setLoading(false); //se desactiva la carga
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []); //al hacer algo, se ejecuta la función

  return (
    <div className="App">
      <header>
        <h1>Perfiles de usuarios</h1>
      </header>
      <main>
        <div className="user-list-container">
          {users.map((user) => (
            <div key={user.id} className="user-card">
              <img src={user.image} alt={user.firstName} />
              <p>
                {user.firstName} {user.lastName}
              </p>
            </div>
          ))}
        </div>
        <button onClick={fetchUsers} disabled={loading}>
          {loading ? "Cargando…" : "Cargar más"}
        </button>
      </main>
    </div>
  );
}

export default App;
