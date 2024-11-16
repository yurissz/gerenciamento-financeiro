import { Route, createBrowserRouter, createRoutesFromElements, Outlet, Navigate } from "react-router-dom";
import Register from "./pages/register/page";
import Login from "./pages/login/page";
import Home from "./pages/home/page";
import UserCobrancas from "./pages/cobrancas/pages";
import SingUpPassword from "./pages/register-password/page";
import UserClients from "./pages/clientes/page";

const ProtectedRoutes = () => {
    const token = localStorage.getItem('token');
    return token ? <Outlet /> : <Navigate to="/" />;
};

export const routes = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<ProtectedRoutes />}>
                <Route path="/home" element={<Home />} />
                <Route path="/cobrancas" element={<UserCobrancas />} />
                <Route path="/clientes" element={<UserClients />} />
                <Route path="/password" element={<SingUpPassword />} />
                {/* <Route path="/clientesdetail" element={<ClientDetails />} /> */}
            </Route>

        </Route>
    )
)