import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UsetAuth from "../hooks/usetAuth";
import Alertas from "../components/Alertas";
import clienteUrl from "../config/urlAxios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alerta, setAlerta] = useState({});
  const { setAuth } = UsetAuth();
  const navigate = useNavigate();

  const handlSubmit = async (e) => {
    e.preventDefault();
    if ([email, password].some((field) => field.trim() === "")) {
      console.log("hay campos vacios");
      setAlerta({ msg: "hay campos vacios", error: true });
      return;
    }
    try {
      const { data } = await clienteUrl.post("/veterinarios/login", {
        email,
        password,
      });
      localStorage.setItem("token",data.token)
      console.log("funciono",data);
      setAuth(data);
      navigate("/admin");
    } catch (error) {
      setAlerta({ msg: error.response.data.msg, error: true });
    }
  };
  const { msg } = alerta;
  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Inicia sesion para administrar tus
          <span className="text-black"> pacientes</span>
        </h1>
      </div>
      <div className="bg-white shadow-lg mt-20 md:mt-5 px-5 py-10 rounded-xl">
        {msg && <Alertas alerta={alerta} />}
        <form onSubmit={handlSubmit}>
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

          <input
            type="submit"
            value="Iniciar sesion"
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

export default Login;
