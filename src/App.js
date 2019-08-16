import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';

import Productos from './components/Productos';
import EditarProducto from './components/EditarProducto';
import AgregarProducto from './components/AgregarProducto';
import Producto from './components/Producto';
import Header from './components/Header';

function App() {

  //State
  const [productos, guardarProductos ] = useState([]);
  const [recargarProductos, guardarRecargarProductos] = useState(true);

  useEffect(() => {

    if(recargarProductos) {
      const consultarAPI = async () => {

        // Consultar la API de JSON Server
        const resultado = await axios.get('https://my-json-server.typicode.com/CarlosBarrios045/producto/restaurant');
        
        guardarProductos(resultado.data);
  
      }
      
      consultarAPI();
      
      // Cambiar a False la recarga de los productos
      guardarRecargarProductos(false);

    }

  }, [recargarProductos])

  return (
      <Router>
        <Header />
        <main className="container mt-5">
          <Switch>

            <Route 
              exact path="/productos"
              render={() => (
                <Productos 
                  productos={productos}
                  guardarRecargarProductos={guardarRecargarProductos}
                />
              )} 
            />
            
            <Route exact path="/nuevo-producto" 
              render={() => (
                <AgregarProducto 
                  guardarRecargarProductos={guardarRecargarProductos}
                />
              )}
            />
            <Route exact path="/productos/:id" component={Producto} />
            <Route exact path="/productos/editar/:id" 
              render={props => {
                
                // Tomar el id del producto
                const idProducto = parseInt(props.match.params.id);

                // El producto que se pasa al state
                const producto = productos.filter(producto => producto.id === idProducto);

                return (
                  <EditarProducto 
                    producto={producto[0]}
                    guardarRecargarProductos={guardarRecargarProductos}
                  />
                );

              }} 

            />

            <div>
              <h1 className="text-center">CRUD - Productos</h1>
              <h2 className="text-center">React Hooks</h2>

            </div>
            
          </Switch>
        </main>

        
        <p className="mt-4 p-2 text-center">Todos los Derechos Reservados.</p>
      </Router>
  );
}

export default App;
