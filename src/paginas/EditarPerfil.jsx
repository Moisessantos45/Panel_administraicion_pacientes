import { useEffect, useState } from "react";
import AdminNav from "../components/AdminNav";
import UsetAuth from "../hooks/usetAuth";
import Alertas from "../components/Alertas";

const EditarPerfil = () => {
  const { auth, actulizarPerfil } = UsetAuth();
  const [perfil, setPerfil] = useState({});
  const [alerta, setAlerta] = useState({});

  useEffect(() => {
    // setPerfil(auth.veterinario);
    setPerfil(auth);
  }, [auth]);

  const handlSubtmit = async (e) => {
    e.preventDefault();
    const { nombre, email } = perfil;
    if (
      [nombre, email].includes("") ||
      [nombre, email].some((text) => text == undefined)
    ) {
      setAlerta({ msg: "hay campos vacios", error: true });
      return;
    }
    const resultado = await actulizarPerfil(perfil);
    setAlerta(resultado);
  };
  const { msg } = alerta;
  return (
    <>
      <AdminNav />
      <h1 className="font-black text-3xl text-center mt-30">Editar Perfil</h1>
      <p className="text-xl  mt-5 mb-10 text-center">
        Modifica tu {""}
        <span className="text-indigo-600 font-bold">Informacion aqui</span>
      </p>
      <div className="flex justify-center">
        <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">
          {msg && <Alertas alerta={alerta} />}
          <form onSubmit={handlSubtmit}>
            <div className="my-3">
              <label className="uppercase font-bold text-gray-600">
                Nombre
              </label>
              <input
                type="text"
                name="nombre"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                value={perfil.nombre || ""}
                onChange={(e) =>
                  setPerfil({
                    ...perfil,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>
            <div className="my-3">
              <label className="uppercase font-bold text-gray-600">
                Sitio web
              </label>
              <input
                type="text"
                name="web"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                value={perfil.web || ""}
                onChange={(e) =>
                  setPerfil({
                    ...perfil,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>
            <div className="my-3">
              <label className="uppercase font-bold text-gray-600">
                Telefono
              </label>
              <input
                type="text"
                name="telefono"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                value={perfil.telefono || ""}
                onChange={(e) =>
                  setPerfil({
                    ...perfil,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>
            <div className="my-3">
              <label className="uppercase font-bold text-gray-600">Email</label>
              <input
                type="email"
                name="email"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                value={perfil.email || ""}
                onChange={(e) =>
                  setPerfil({
                    ...perfil,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>
            <input
              type="submit"
              value="Guardar cambios"
              className="bg-indigo-700 px-10 py-3 font-bold text-white uppercase rounded-lg w-full mt-5 hover:cursor-pointer hover:bg-indigo-600 hover:shadow-lg"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default EditarPerfil;
