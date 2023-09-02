import { Outlet, Navigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import UsetAuth from "../hooks/usetAuth";

const RutaProtegida = () => {
  const { auth, cargando } = UsetAuth();
  const id_user = auth.veterinario || auth;
  console.log("aunt", id_user);
  console.log("carganod", cargando);
  if (cargando) return "cargando ......";
  return (
    <>
      <Header />
      {id_user?._id ? (
        <main className="container mt-10 mx-auto">
          {" "}
          <Outlet />
        </main>
      ) : (
        <Navigate to="/" />
      )}
      <Footer />
    </>
  );
};

export default RutaProtegida;
