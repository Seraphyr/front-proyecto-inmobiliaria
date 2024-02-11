

export default function Register() {
  return (
    <div className="container bg-dark text-white border-0 rounded align-content-lg-center p-5 ">
      <h1>Register</h1>
      <form>
        <div className="form-group-row">
          <div className="form-group col-md-6">
            <label htmlFor="nombre">Nombre:</label>
            <input type="text" className="form-control" id="nombre" name="nombre" placeholder="Ana" />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="apellido">Apellido:</label>
            <input type="text" className="form-control" id="apellido" name="apellido" placeholder="Suarez"/>
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="email">Email:</label>
            <input type="text" className="form-control" id="email" name="email" placeholder="ejemplo@ejemplo.com"/>
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="clave">Clave:</label>
            <input type="password" className="form-control" id="clave" name="clave" placeholder="Ingresa tu contraseña"/>
          </div>
        </div>
        <button type="submit" className="btn">Registrarse</button>

      </form>

    </div>
  )
}
