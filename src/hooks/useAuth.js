import { useContext } from "react";
import AuthContext from "../helper/AuthProvider";

const useAuth = () => {
    return useContext(AuthContext);
}

export default useAuth;