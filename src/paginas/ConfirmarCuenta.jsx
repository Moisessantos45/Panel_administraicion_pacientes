import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Alertas from "../components/Alertas";
import clienteUrl from "../config/urlAxios";

const ConfirmarCuenta = () => {
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [alerta, setAlerta] = useState({});

  const params = useParams();
  const { id } = params;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const confirmacion = async () => {
      try {
        const url = `/veterinarios/confirmar/${id}`;
        console.log(url);
        const {data} = await clienteUrl(url);
        console.log(data);
        setCuentaConfirmada(true);
        setAlerta({
          msg: data.msg,
          error: false,
        });
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true,
        });
      }
      setCargando(false);
    };
    confirmacion();
  }, []);

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Confirma tu cuenta y comienza a registrar a
          <span className="text-black"> pacientes</span>
        </h1>
      </div>
      <div className="bg-white shadow-lg mt-20 md:mt-5 px-5 py-10 rounded-xl">
        {!cargando && <Alertas alerta={alerta} />}
        {cuentaConfirmada && (
          <Link className="block my-5 text-center text-gray-600" to="/">
            Inicia sesion
          </Link>
        )}
      </div>
    </>
  );
};

export default ConfirmarCuenta;
