import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Alertas from "../components/Alertas";
import clienteUrl from "../config/urlAxios";

const RecuperarPassword = () => {
  const [password, setPassword] = useState("");
  const [alerta, setAlerta] = useState({});
  const [tokeValido, setTokenValido] = useState(false);
  const [passwordUpdate, setPasswordUpdate] = useState(false);
  const params = useParams();
  const { token } = params;
  useEffect(() => {
    const comprobrarToken = async () => {
      try {
        await clienteUrl(`/veterinarios/olvide-password/${token}`);
        setAlerta({
          msg: "coloca tu nuevo password",
          error: false,
        });
        setTokenValido(true);
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true,
        });
      }
    };
    comprobrarToken();
  }, []);

  const handlSubmit = async (e) => {
    e.preventDefault();

    if (password.trim() == "" || password.length < 6) {
      setAlerta({ msg: "El password es muy pequeño", error: true });
      return;
    }

    try {
      const url = `/veterinarios/olvide-password/${token}`;
      const { data } = await clienteUrl.post(url, { password });
      setPasswordUpdate(true);
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
          Restablece tu password y recupera tu
          <span className="text-black"> acceso</span>
        </h1>
      </div>
      <div className="bg-white shadow-lg mt-20 md:mt-5 px-5 py-10 rounded-xl">
        {msg && <Alertas alerta={alerta} />}
        {tokeValido && (
          <>
            <form onSubmit={handlSubmit}>
              <div className="my-5">
                <label className="upppercase text-gray-600 block text-xl font-bold">
                  Tu nuevo Password
                </label>
                <input
                  type="password"
                  placeholder="Tu nuevo password"
                  className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <input
                type="submit"
                value="Actulizar password"
                className="py-3 w-full rounded-xl bg-indigo-700 text-white uppercase mt-5 font-bold hover:cursor-pointer hover:bg-indigo-800 px-10 md:w-auto justify-center"
              />
            </form>
          </>
        )}
        {passwordUpdate && (
          <Link
            className="block my-5 text-center text-gray-600"
            to="/registrar"
          >
            ¿No tienes cuenta? Registrate
          </Link>
        )}
      </div>
    </>
  );
};

export default RecuperarPassword;
