import { useState } from "react";
import { Link } from "react-router-dom";
import Alertas from "../components/Alertas";
import clienteUrl from "../config/urlAxios";

const Registrar = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repetirPassword, setRepetirPassword] = useState("");
  const [alerta, setAlerta] = useState({});
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      [nombre, email, password, repetirPassword].some(
        (field) => field.trim() === ""
      )
    ) {
      console.log("hay campos vacios");
      setAlerta({ msg: "hay campos vacios", error: true });
      return;
    }
    if (password !== repetirPassword) {
      console.log("los password no son iguales");
      setAlerta({
        msg: "los password no son igualeshay campos vacios",
        error: true,
      });
      return;
    }
    if (password.length < 6) {
      console.log("el password es muy corto");
      setAlerta({ msg: "el password es muy corto", error: true });
      return;
    }
    setAlerta({});
    console.log("envio datos");
    try {
      const url = `/veterinarios`;
      await clienteUrl.post(url, { nombre, email, password });
      setAlerta({ msg: "La cuenta se creo correctamente", error: false });
    } catch (error) {
      setAlerta({ msg: error.response.data.msg, error: true });
    }
  };
  const { msg } = alerta;
  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Crea una cuenta y registra a tus
          <span className="text-black"> pacientes</span>
        </h1>
      </div>
      <div className="bg-white shadow-lg mt-20 md:mt-5 px-5 py-10 rounded-xl">
        {msg && <Alertas alerta={alerta} />}

        <form onSubmit={handleSubmit}>
          <div className="my-5">
            <label className="upppercase text-gray-600 block text-xl font-bold">
              Nombre
            </label>
            <input
              type="text"
              placeholder="Tu nombre"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          <div className="my-5">
            <label className="upppercase text-gray-600 block text-xl font-bold">
              Email
            </label>
            <input
              type="email"
              placeholder="Ingresa tu email"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="my-5">
            <label className="upppercase text-gray-600 block text-xl font-bold">
              Password
            </label>
            <input
              type="password"
              placeholder="Ingresa tu password"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="my-5">
            <label className="upppercase text-gray-600 block text-xl font-bold">
              Repite tu Password
            </label>
            <input
              type="password"
              placeholder="Repite tu password"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={repetirPassword}
              onChange={(e) => setRepetirPassword(e.target.value)}
            />
          </div>
          <input
            type="submit"
            value="Crear cuenta"
            className="py-3 w-full rounded-xl bg-indigo-700 text-white uppercase mt-5 font-bold hover:cursor-pointer hover:bg-indigo-800 px-10 md:w-auto justify-center"
          />
        </form>
        <nav className="mt-10 lg:flex lg:justify-between">
          <Link className="block my-5 text-center text-gray-600" to="/">
            Ya tienes una cuenta? Inicia sesion
          </Link>
          <Link
            className="block my-5 text-center text-gray-600"
            to="/olvide-password"
          >
            Olvide mi passsword
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Registrar;
