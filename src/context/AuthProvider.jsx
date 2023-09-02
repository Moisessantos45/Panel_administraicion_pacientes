import { useState, createContext, useEffect } from "react";
import clienteUrl from "../config/urlAxios";
// import Alertas from "../components/Alertas";

const AuthContext = createContext();
/* eslint-disable react/prop-types */
const AuthProvider = ({ children }) => {
  const [cargando, setCargando] = useState(true);
  const [auth, setAuth] = useState({});
  useEffect(() => {
    const autenticarUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setCargando(false);
        return;
      }
      const confi = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const { data } = await clienteUrl("/veterinarios/perfil", confi);

        //linea importante modicar si si da error en otros campos
        setAuth(data.veterinario || data);
      } catch (error) {
        console.log(error);
        setAuth({});
      }
      setCargando(false);
    };
    autenticarUser();
  }, []);

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    setAuth({});
  };

  const actulizarPerfil = async (datos) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setCargando(false);
      return;
    }
    const confi = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const url = `/veterinarios/perfil/${datos._id}`;
      const { data } = await clienteUrl.put(url, datos, confi);
      console.log(data);
      // setAuth(data);
      return {
        msg: "actulizacion de datos correctamente",
        error: false,
      };
    } catch (error) {
      return {
        msg: error.response.data.msg,
        error: true,
      };
    }
  };

  const guardarPasssoword=async datos=>{
    console.log(datos)
    const token = localStorage.getItem("token");
    if (!token) {
      setCargando(false);
      return;
    }
    const confi = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const url=`/veterinarios/actualizar-password`
      const {data}= await clienteUrl.put(url,datos,confi)
      console.log("datoa de cambiar password",data)
      return {
        msg: data.msg,
        error: false,
      };
    } catch (error) {
      return {
        msg: error.response.data.msg,
        error: true,
      };
    }
  }
  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        cargando,
        cerrarSesion,
        actulizarPerfil,
        guardarPasssoword
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;
