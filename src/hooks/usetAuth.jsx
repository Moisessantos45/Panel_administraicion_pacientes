import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

const UsetAuth = () => {
  return useContext(AuthContext);
};

export default UsetAuth;
