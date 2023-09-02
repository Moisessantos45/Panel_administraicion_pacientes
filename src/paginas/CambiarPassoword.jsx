import { useState } from "react";
import AdminNav from "../components/AdminNav";
import Alertas from "../components/Alertas";
import UsetAuth from "../hooks/usetAuth";

const CambiarPassoword = () => {
  const {guardarPasssoword}=UsetAuth()
  const [alerta, setAlerta] = useState({});
  const [password, setPassword] = useState({
    password: "",
    nuevopassword: "",
  });
  const handlSubtmit = async (e) => {
    e.preventDefault();
    if (Object.values(password).some((datos) => datos === "")) {
      setAlerta({
        msg: "Campos vacios",
        error: true,
      });
      return;
    }
    if (password.nuevopassword.length < 6) {
      setAlerta({
        msg: "Password muy corto minimo 7 caracteres",
        error: true,
      });
      return;
    }
    const mensaje =await guardarPasssoword(password)
    setAlerta(mensaje)
  };
  const { msg } = alerta;
  return (
    <>
      <AdminNav />
      <h1 className="font-black text-3xl text-center mt-30">
        Cambiar Password
      </h1>
      <p className="text-xl  mt-5 mb-10 text-center">
        Modifica tu {""}
        <span className="text-indigo-600 font-bold">Password aqui</span>
      </p>

      <div className="flex justify-center">
        <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">
          {msg && <Alertas alerta={alerta} />}
          <form onSubmit={handlSubtmit}>
            <div className="my-3">
              <label className="uppercase font-bold text-gray-600">
                Password
              </label>
              <input
                type="password"
                name="password"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                placeholder="Escribe tu Password"
                onChange={(e) =>
                  setPassword({
                    ...password,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>
            <div className="my-3">
              <label className="uppercase font-bold text-gray-600">
                Tu nuevo Password
              </label>
              <input
                type="password"
                name="nuevopassword"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                placeholder="Escribe tu nuevo Password"
                onChange={(e) =>
                  setPassword({
                    ...password,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>
            <input
              type="submit"
              value="Actulizar passowrd"
              className="bg-indigo-700 px-10 py-3 font-bold text-white uppercase rounded-lg w-full mt-5 hover:cursor-pointer hover:bg-indigo-600 hover:shadow-lg"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default CambiarPassoword;
