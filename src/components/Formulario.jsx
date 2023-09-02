import { useState, useEffect } from "react";
import Alertas from "./Alertas";
import UsetPaciente from "../hooks/usePacientes";

const Formulario = () => {
  const [nombre, setNombre] = useState("");
  const [propietario, setPropietario] = useState("");
  const [email, setEmail] = useState("");
  const [fecha, setFecha] = useState("");
  const [sintomas, setSintomas] = useState("");
  const [alerta, setAlerta] = useState({});
  const [id, setId] = useState(null);

  // const { pacientes } = UsetPaciente();
  // console.log(pacientes);

  const { guardarPaciente, paciente } = UsetPaciente();
  useEffect(() => {
    if (paciente?.nombre) {
      setNombre(paciente.nombre);
      setPropietario(paciente.propietario);
      setEmail(paciente.email);
      setFecha(paciente.fecha);
      setSintomas(paciente.sintomas);
      setId(paciente._id);
    }
  }, [paciente]);

  const handlSubtmi = (e) => {
    e.preventDefault();
    if (
      [nombre, propietario, email, fecha, sintomas].some(
        (data) => data.trim() == ""
      )
    ) {
      setAlerta({ msg: "hay campos vacios", error: true });
      return;
    }

    setAlerta({});
    guardarPaciente({ nombre, propietario, email, fecha, sintomas, id });
    setNombre("");
    setPropietario("");
    setEmail("");
    setFecha("");
    setSintomas("");
    setId("");
  };
  const { msg } = alerta;
  return (
    <>
      <h2 className="font-black text-center text-3xl">
        {" "}
        Administra tus pacientes
      </h2>
      <p className="text-lg text-center mb-10">
        Añade tus pacientes y {""}
        <span className="text-indigo-600 font-bold">administralos</span>
      </p>

      <form
        className="bg-white mb-10 py-10 px-5 lg:mb-5 shadow-md rounded-md"
        onSubmit={handlSubtmi}
      >
        <div className="mb-5">
          <label
            htmlFor="paciente"
            className="text-bold text-gray-700 uppercase"
          >
            Nombre del paciente
          </label>
          <input
            type="text"
            id="paciente"
            placeholder="Ingresa el nombre del paciente"
            className="border-2 w-full mt-2 placeholder-gray-400 rounded-md"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="encargado"
            className="text-bold text-gray-700 uppercase"
          >
            Nombre del encargado
          </label>
          <input
            type="text"
            id="encargado"
            placeholder="Ingresa el nombre del encargado"
            className="border-2 w-full mt-2 placeholder-gray-400 rounded-md"
            value={propietario}
            onChange={(e) => setPropietario(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="email" className="text-bold text-gray-700 uppercase">
            Email personal
          </label>
          <input
            type="email"
            id="email"
            placeholder="Ingresa el email"
            className="border-2 w-full mt-2 placeholder-gray-400 rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="fecha" className="text-bold text-gray-700 uppercase">
            Fecha alta
          </label>
          <input
            type="date"
            id="fecha"
            className="border-2 w-full mt-2 placeholder-gray-400 rounded-md"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="sintomas"
            className="text-bold text-gray-700 uppercase"
          >
            Sintomas
          </label>
          <textarea
            id="sintomas"
            placeholder="sintomas detectados"
            className="border-2 w-full mt-2 placeholder-gray-400 rounded-md"
            value={sintomas}
            onChange={(e) => setSintomas(e.target.value)}
          />
        </div>
        <input
          type="submit"
          className="cursor-pointer uppercase font-bold w-full bg-indigo-600 p-3 text-white transition-colors hover:bg-indigo-700 rounded-md"
          value={id ? "Guardando cambios" : "Agregar paciente"}
        />
      </form>
      {msg && <Alertas alerta={alerta} />}
    </>
  );
};

export default Formulario;
