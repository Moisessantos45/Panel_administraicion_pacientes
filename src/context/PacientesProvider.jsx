import { useState, createContext, useEffect } from "react";
import clienteUrl from "../config/urlAxios";
import UsetAuth from "../hooks/usetAuth";
import Alertas from "../components/Alertas"; // eslint-disable-line no-unused-vars
const PacientesContext = createContext();

/* eslint-disable react/prop-types */
export const PacienteProvider = ({ children }) => {
  const [pacientes, setPacientes] = useState([]);
  const [paciente, setPaciente] = useState({});
  const [alerta, setAlerta] = useState({}); // eslint-disable-line no-unused-vars
  const {auth}=UsetAuth()
  console.log(auth)
  useEffect(() => {
    const obtenerPacientes = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const confi = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await clienteUrl("/pacientes", confi);
        console.log(data);
        setPacientes(data);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerPacientes();
  }, [auth]);

  const guardarPaciente = async (paciente) => {
    const token = localStorage.getItem("token");
    const confi = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    if (paciente.id) {
      try {
        console.log("acientye a editar", paciente.id);
        const { data } = await clienteUrl.put(
          `/pacientes/${paciente.id}`,
          paciente,
          confi
        );
        console.log("data edit", data);
        const pacientesActulizados = pacientes.map((pacienteState) =>
          pacienteState._id == data._id ? data : pacienteState
        );
        setPacientes(pacientesActulizados);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const { data } = await clienteUrl.post("/pacientes", paciente, confi);
        const { createdAt, updatedAt, __v, ...pacienteAlmacenado } = data; // eslint-disable-line no-unused-vars
        setPacientes([pacienteAlmacenado, ...pacientes]);
      } catch (error) {
        setAlerta({ msg: error.response.data.msg, error: true });
      }
    }
  };
  const setEdicion = (paciente) => {
    setPaciente(paciente);
  };

  const eliminarPaciente = async (id) => {
    const confirmar = confirm("¿Deseas elimar el paciente");
    if (confirmar) {
      try {
        const token = localStorage.getItem("token");
        const confi = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await clienteUrl.delete(`/pacientes/${id}`, confi);
        console.log("paciente eliminado", data);
        const pacientesActulizados = pacientes.filter(
          (pacienteState) => pacienteState._id !== id
        );
        setPacientes(pacientesActulizados);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <PacientesContext.Provider
      value={{
        pacientes,
        guardarPaciente,
        setEdicion,
        paciente,
        eliminarPaciente,
      }}
    >
      {children}
    </PacientesContext.Provider>
  );
};

export default PacientesContext;
