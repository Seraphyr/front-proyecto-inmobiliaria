import './Home.css'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    const [inmuebles, setInmuebles] = useState([]);

    const logout = () => {
        Cookies.remove('token');
        navigate('/login');
    }

    const obtenerInmuebles = async () => {
        const response = await fetch('http://localhost:3001/inmuebles/inmuebles', {
            headers: {
                'Authorization': Cookies.get('token')
            }
        })
        const data = await response.json();
        setInmuebles(data);
    }

    const eliminarInmueble = async (id) => {
        const response = await fetch(`http://localhost:3001/inmuebles/eliminar/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': Cookies.get('token')
            }
        })
        const data = await response.json();
        console.log(data);
        obtenerInmuebles();
    }


    const agregarInmueble = async (event) => {
        event.preventDefault();
        const form = event.target;
        const inmueble = {
            nombre: form.nombre.value,
            direccion: form.direccion.value,
            metrosCuadrados: form.metrosCuadrados.value,
            precioVenta: form.precioVenta.value,
        }
        const response = await fetch('http://localhost:3001/inmuebles/nuevo', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': Cookies.get('token')
            },
            body: JSON.stringify(inmueble)
        })
        const data = await response.json();
        console.log(data);
        obtenerInmuebles();
    }

 /*    const actualizarInmueble = async (event) => {
        event.preventDefault();
        const form = event.target;
        const inmueble = {
            id: form.id.value,
            nombre: form.nombre.value,
            direccion: form.direccion.value,
            metrosCuadrados: form.metrosCuadrados.value,
            precioVenta: form.precioVenta.value,
        }
    } */

    useEffect(() => {
        obtenerInmuebles();
        agregarInmueble();
        eliminarInmueble();

    }, []);



    return (
        <div className='container text-light '>
            <h1>Home</h1>

            <h2>Inmuebles</h2>
            {inmuebles.length > 0 ? (
                inmuebles.map((inmueble) => (
                    <div className="container">
                        <table key={inmueble.id} className="table table-dark table-striped">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nombre</th>
                                    <th>Dirección</th>
                                    <th>Metros cuadrados</th>
                                    <th>Precio de venta</th>
                                    <th>Eliminar</th>
                                    <th>Editar</th>
                                </tr>
                            </thead>
                            <tr>
                                <td>{inmueble.id}</td>
                                <td>{inmueble.nombre}</td>
                                <td>{inmueble.direccion}</td>
                                <td>{inmueble.metrosCuadrados}</td>
                                <td>{inmueble.precioVenta}</td>
                                <td><button type="button" className="btn btn-danger" onClick={() => eliminarInmueble(inmueble.id)}>Eliminar</button></td>
                                <td><button type="button" className="btn btn-primary" onClick={() => navigate(`/editar/${inmueble.id}`)}>Editar</button></td>
                            </tr>

                        </table>
                    </div>

                ))
            ) : (
                <p>No hay inmuebles disponibles</p>
            )}
            <div className="container">
                <h1>Agregar Inmueble</h1>
                
                <form >
                    <div className="form-row" onSubmit={agregarInmueble}>
                        <div className="col-md-3 mb-3">
                            <label htmlFor="validationDefault01">Nombre</label>
                            <input type="text" className="form-control" id="validationDefault01" placeholder="Casa-1" required />


                            <label htmlFor="validationDefault02">Dirección</label>
                            <input type="text" className="form-control" id="validationDefault02" placeholder="Calle 1"  required />


                            <label >Metros Cuadrados</label>
                            <input type="number" className="form-control" id="validationDefault05" placeholder="100" required />

                            <label for="validationDefault05">Precio de venta en U$S</label>
                            <input type="number" className="form-control" id="validationDefault05" placeholder="50000" required />
                        </div>

                    </div>
                    <button className="btn btn-primary" type="submit">Agregar</button>
                </form>
                <button type="button" className="btn btn-secondary" onClick={logout}>Logout</button>

            </div>

        </div>

    )
}

export default Home;