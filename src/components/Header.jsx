import { Link } from "react-router-dom";
import UsetAuth from "../hooks/usetAuth";

const Header = () => {
    const {cerrarSesion}=UsetAuth()
  return (
    <>
      <header className="py-10 bg-indigo-600">
        <div className="container mx-auto flex justify-between flex-col lg:flex-row items-center">
          <h1 className=" font-bold text-2xl text-indigo-200 text-center">
            Administrador de citas y {""}
            <span className="text-white font-black">pacientes</span>
          </h1>
          <nav className="flex flex-col items-center lg:flex-row gap-4 mt-5 lg:mt-0">
            <Link
              className="text-white uppercase font-bold text-sm"
              to="/admin/perfil"
            >
              Perfil
            </Link>
            <Link
              className="text-white uppercase font-bold text-sm"
              to="/admin"
            >
              Pacientes
            </Link>
            <button type="button" className="text-white uppercase font-bold text-sm"
            onClick={cerrarSesion}>
                Cerrar sesion  
            </button>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
