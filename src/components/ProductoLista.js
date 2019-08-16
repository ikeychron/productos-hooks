import React from 'react';
import { Link } from 'react-router-dom';
import Swal from "sweetalert2";
import axios from 'axios';

function ProductoLista({producto, guardarRecargarProductos}) {

  const eliminarProducto = (id) => {
    Swal.fire({
      title: '¿Estás Seguro?',
      text: "Un Producto eliminado no se puede recuperar",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then( async (result) => {
      if (result.value) {

        try {
          const url = `http://localhost:4000/restaurant/${producto.id}`;

          const resultado = await axios.delete(url);
          
          if(resultado.status === 200) {
            Swal.fire(
              '¡Platillo Eliminado!',
              'El Producto fue eliminado',
              'success'
            )

            // Consultar la API nuevamente
            guardarRecargarProductos(true);
          }

          

        } catch (error) {
          console.log(error);
          Swal.fire({
            type: 'error',
            title: 'Error',
            text: 'Hubo un error, vuelve a intentarlo!'
          })
        }

      }
    })
  }


  return (
    <li className="list-group-item d-flex justify-content-between align-items-center" data-categoria={producto.categoria}>
      <p>
        {producto.nombrePlatillo} {' '}
        <span className="font-weight-bold">${producto.precioPlatillo}</span>
      </p>
      <div>
        <Link 
          to={`/productos/editar/${producto.id}`}
          className="btn btn-success mr-2"
        >Editar</Link>

        <button
          type="button"
          className="btn btn-danger"
          onClick={() => eliminarProducto(producto.id)}
        >
          Eliminar &times;
        </button>
      </div>

      
    </li>

  );

}

export default ProductoLista;