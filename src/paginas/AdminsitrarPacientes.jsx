import { useState } from "react";
import Formulario from "../components/Formulario";
import ListaPacientes from "../components/ListaPacientes";

const AdminsitrarPacientes = () => {
  const [mostrarForm, setMostrarForm] = useState(false);
  console.log(mostrarForm);

  return (
    <div className="flex flex-col md:flex-row">
      <button
        type="button"
        className="bg-indigo-600 uppercase font-bold mx-10 p-3 rounded-md text-white mb-10 md:hidden"
        onClick={() => setMostrarForm(!mostrarForm)}
        > {mostrarForm ? "Ocultar Form" : "Mostrar Form"}
      </button>
      <div
        className={`${
          mostrarForm ? "block" : "hidden"
        } md:block md:w-1/2 lg:w-2/5`}
      >
        <Formulario />
      </div>
      <div className="md:w-1/2 lg:w-3/5">
        <ListaPacientes />
      </div>
    </div>
  );
};

export default AdminsitrarPacientes;
