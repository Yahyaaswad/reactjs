import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/Home";
import Layout from "./layout/Layout";
import RegisterPage from "./pages/Register/Register";
import LoginPage from "./pages/login/Login";
import UserDetailsPage from "./pages/UserDetails";
import NoPage from "./pages/NoPage";
import MyOrdersPage from "./pages/orders/MyOrdersPage"
import { createContext, useState } from "react";
import Dashboard from "../Dashboard/Dashboard";
import Dashprod from "../Dashboard/DashProd";
import DashCAt from "../Dashboard/DashCat";
import DashOrd from "../Dashboard/DashOrd";
import NewOrder from "../Dashboard/NewOrder";
import EditOrder from "../Dashboard/EditOrder";

export const AuthContext = createContext(false)

export default function MyApp() {
    const [authState, setAuthState] = useState(false)

    return( <AuthContext.Provider value={{ authState, setAuthState }}>
        <BrowserRouter>
        <Routes>
      
    <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        {
            authState ?
                <> 
                     
                 <Route path="dashboard" element={<Dashboard />}>
                    <Route path="Dashprod" element={<Dashprod/>}/>
                    <Route path="DashCat" element={<DashCAt/>}/>
                    <Route path="DashOrd" element={<DashOrd/>}/>
                    <Route path="NewOrder" element={<NewOrder/>}/>
                    <Route path="EditOrder" element={<EditOrder/>}/>
                
                 </Route>

             
               
 
                    <Route path="user" element={<UserDetailsPage />} />
                    <Route path="orders" element={<MyOrdersPage />} />
                 
                </>
                :
                <>
                    <Route path="register" element={<RegisterPage />} />
                    <Route path="login" element={<LoginPage />} />
                    
                </>
        }
        <Route path="*" element={<NoPage />} />
    </Route>
  
</Routes>     

        </BrowserRouter>
      
    </AuthContext.Provider>
   
     
    );
}