import { useState } from "react";
import { Link } from "react-router-dom";
import Alertas from "../components/Alertas";
import clienteUrl from "../config/urlAxios";

const OlvidePassword = () => {
  const [email, setEmail] = useState("");
  const [alerta, setAlerta] = useState({});

  const handelSubmit = async (e) => {
    e.preventDefault();
    if (email.trim() == "" || email.length < 6) {
      setAlerta({ msg: "El email es obligatorio", error: true });
      return;
    }
    try {
      const { data } = await clienteUrl.post("/veterinarios/olvide-password", {
        email,
      });
      console.log(data);
      setAlerta({ msg: data.msg, error: false });
    } catch (error) {
      setAlerta({ msg: error.response.data.msg, error: true });
    }
  };
  const { msg } = alerta;
  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Recupera tu password y cuenta de tus
          <span className="text-black"> pacientes</span>
        </h1>
      </div>
      <div className="bg-white shadow-lg mt-20 md:mt-5 px-5 py-10 rounded-xl">
        {msg && <Alertas alerta={alerta} />}
        <form onSubmit={handelSubmit}>
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
          <input
            type="submit"
            value="Recuperar"
            className="py-3 w-full rounded-xl bg-indigo-700 text-white uppercase mt-5 font-bold hover:cursor-pointer hover:bg-indigo-800 px-10 md:w-auto justify-center"
          />
        </form>
        <nav className="mt-10 lg:flex lg:justify-between">
          <Link
            className="block my-5 text-center text-gray-600"
            to="/registrar"
          >
            ¿No tienes cuenta? Registrate
          </Link>
          <Link className="block my-5 text-center text-gray-600" to="/">
            Ya tienes una cuenta? Inicia sesion
          </Link>
        </nav>
      </div>
    </>
  );
};

export default OlvidePassword;
