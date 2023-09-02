import axios from "axios";

const clienteUrl=axios.create ({
    baseURL:`${import.meta.env.VITE_BACKEND_URL}/api`
})

export default clienteUrl