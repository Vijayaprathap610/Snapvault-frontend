import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";


function PrivateRoute({ children }) {
    const { user } = useContext(AuthContext);

    if (!user) {
        return <Navigate to="/" />;
    }

    return children;
}

export default PrivateRoute;