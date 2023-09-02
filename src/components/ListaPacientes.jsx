import UsetPaciente from "../hooks/usePacientes";
import Paciente from "./Paciente";

const ListaPacientes = () => {
  const { pacientes } = UsetPaciente();
  console.log(pacientes);
  return (
    <>
      {pacientes.length ? (
        <>
          <h2 className="font-black text-center text-3xl">
            Lista de pacientes{" "}
          </h2>
          <p className="text-xl mt-5 mb-10 text-center">
            Administra tu {""}
            <span className="text-indigo-600 font-bold">pacientes y citas</span>
          </p>
          {pacientes.map((paciente) => (
            <Paciente key={paciente._id} paciente={paciente} />
          ))}
        </>
      ) : (
        <>
          <h2 className="font-black text-center text-3xl">No hay pacientes </h2>
          <p className="text-xl mt-5 mb-10 text-center">
            Los pacientes agregado se visualizan {""}
            <span className="text-indigo-600 font-bold">en este apartado</span>
          </p>
        </>
      )}
    </>
  );
};

export default ListaPacientes;
