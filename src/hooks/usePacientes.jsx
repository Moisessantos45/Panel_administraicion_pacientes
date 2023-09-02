import { useContext } from "react";
import PacientesContext from "../context/PacientesProvider";

const UsetPaciente = () => {
  return useContext(PacientesContext);
};

export default UsetPaciente;