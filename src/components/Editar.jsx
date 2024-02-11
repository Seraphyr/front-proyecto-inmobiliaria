import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Cookies from 'js-cookie'

export default function Editar() {
    const id = useParams().id
    const [inmueble, setInmueble] = useState({});

    const obtenerInmueblesPorId = async () => {
        const response = await fetch(`http://localhost:3001/inmuebles/${id}`, {
            headers: {
                'Authorization': Cookies.get('token')
            }
        })
        const data = await response.json();
        setInmueble(data);
    }
    useEffect(() => {
        obtenerInmueblesPorId()
    })

    const handleOnChange = (event) => {
        const { name, value } = event.target;
        setInmueble({ ...inmueble, [name]: value });
    }


    const editarInmueble = async (event) => {
        event.preventDefault();
        const response = await fetch(`http://localhost:3001/inmuebles/editar/${id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': Cookies.get('token')
            },
            body: JSON.stringify(inmueble)
        })
        const data = await response.json();
        console.log(data);
        alert('Inmueble editado correctamente');
    }
    return (
        <div>
            <h1>Editar Inmueble {id}</h1>
            {inmueble && (
                <form onSubmit={editarInmueble}>
                    <label htmlFor="nombre">Nombre:</label>
                    <input type="text" id="nombre" name="nombre" defaultValue={inmueble.nombre} onChange={handleOnChange} />
                    <label htmlFor="direccion">Dirección:</label>
                    <input type="text" id="direccion" name="direccion" defaultValue={inmueble.direccion} onChange={handleOnChange} />
                    <label htmlFor="metrosCuadrados">Metros Cuadrados:</label>
                    <input type="number" id="metrosCuadrados" name="metrosCuadrados" defaultValue={inmueble.metrosCuadrados} onChange={handleOnChange} />
                    <label htmlFor="precio">Precio:</label>
                    <input type="number" id="precio" name="precio" defaultValue={inmueble.precioVenta} onChange={handleOnChange} />
                    <button type="submit">Editar</button>
                </form>
            )}
            <button onClick={() => window.history.back()}>Volver</button>
        </div>
    )
}
