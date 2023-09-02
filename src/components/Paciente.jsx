import UsetPaciente from "../hooks/usePacientes";
/* eslint-disable react/prop-types */
const Paciente = ({ paciente }) => {
    const {setEdicion,eliminarPaciente}=UsetPaciente()
  const { nombre, propietario, email, fecha, sintomas, _id } = paciente;
  const formatearFecha = (fecha) => {
    const nuevaFacha = new Date(fecha);
    return new Intl.DateTimeFormat("es-MX", { dateStyle: "long" }).format(
      nuevaFacha
    );
  };
  return (
    <div className="mx-5 my-10 bg-white shadow-md px-5 py-10 rounded-xl">
      <p className="font-bold uppercase text-indigo-700 my-2">
        Nombre: {""}
        <span className="font-normal text-black uppercase">{nombre}</span>
      </p>
      <p className="font-bold uppercase text-indigo-700 my-2">
        Encargado: {""}
        <span className="font-normal text-black uppercase">{propietario}</span>
      </p>
      <p className="font-bold uppercase text-indigo-700 my-2">
        Email: {""}
        <span className="font-normal text-black uppercase">{email}</span>
      </p>
      <p className="font-bold uppercase text-indigo-700 my-2">
        Fecha: {""}
        <span className="font-normal text-black uppercase">{formatearFecha(fecha)}</span>
      </p>
      <p className="font-bold uppercase text-indigo-700 my-2">
        Sintomas: {""}
        <span className="font-normal text-black uppercase">{sintomas}</span>
      </p>
      <div className="flex justify-between my-5">
        <button className="py-2 px-10 text-white bg-indigo-600 hover:border-indigo-700 uppercase font-bold rounded-lg"
        type="button"
        onClick={()=>setEdicion(paciente)}
        >Editar</button>
        <button className="py-2 px-10 text-white bg-red-600 hover:border-red-700 uppercase font-bold rounded-lg"
        type="button"
        onClick={()=>eliminarPaciente(_id)}
        >Eliminar</button>

      </div>
    </div>
  );
};

export default Paciente;
