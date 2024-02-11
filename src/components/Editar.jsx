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
            
            {inmueble && (
                <div className="container  text-white border-0 rounded align-content-lg-center p-5 col-3">
                    <h1 className="text-white">Editar Inmueble {id}</h1>
                    <form onSubmit={editarInmueble} className="form-group ">
                        <label htmlFor="nombre" className='form-label text-light form-text '>Nombre:</label>
                        <input type="text" id="nombre" name="nombre" defaultValue={inmueble.nombre} onChange={handleOnChange} className='form-control' />
                        <label htmlFor="direccion" className='form-label text-light form-text '>Dirección:</label>
                        <input type="text" id="direccion" name="direccion" defaultValue={inmueble.direccion} onChange={handleOnChange} className='form-control' />
                        <label htmlFor="metrosCuadrados" className='form-label text-light form-text '>Metros Cuadrados:</label>
                        <input type="number" id="metrosCuadrados" name="metrosCuadrados" defaultValue={inmueble.metrosCuadrados} onChange={handleOnChange} className='form-control' />
                        <label htmlFor="precio" className='form-label text-light form-text '>Precio:</label>
                        <input type="number" id="precio" name="precio" defaultValue={inmueble.precioVenta} onChange={handleOnChange} className='form-control' />
                        <button type="submit" className="btn">Editar</button>
                    </form>
                    <button onClick={() => window.history.back()} className="btn">Volver</button>
                </div>
            )}

        </div>
    )
}
