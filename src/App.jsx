import { Route, BrowserRouter, Routes } from "react-router-dom";
import AouthLayout from "./layout/AouthLayout";
import RutaProtegida from "./layout/RutaProtegida";
import Login from "./paginas/Login";
import Registrar from "./paginas/Registrar";
import OlvidePassword from "./paginas/OlvidePassword";
import RecuperarPassword from "./paginas/RecuperarPassword";
import ConfirmarCuenta from "./paginas/ConfirmarCuenta";
import AdminsitrarPacientes from "./paginas/AdminsitrarPacientes";
import EditarPerfil from "./paginas/EditarPerfil";
import CambiarPassoword from "./paginas/CambiarPassoword";
import { AuthProvider } from "./context/AuthProvider";
import { PacienteProvider } from "./context/PacientesProvider";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PacienteProvider>
          <Routes>
            <Route path="/" element={<AouthLayout/>}>
              <Route index element={<Login />} />
              <Route path="registrar" element={<Registrar />} />
              <Route path="olvide-password" element={<OlvidePassword />} />
              <Route
                path="olvide-password/:token"
                element={<RecuperarPassword />}
              />
              <Route path="confirmar/:id" element={<ConfirmarCuenta />} />
            </Route>
            <Route path="/admin" element={<RutaProtegida />}>
              <Route index element={<AdminsitrarPacientes />}></Route>
              <Route path="perfil" element={<EditarPerfil/>} />
              <Route path="cambiar-password" element={<CambiarPassoword/>} />
            </Route>
          </Routes>
        </PacienteProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
