
import SideBar from "../components/Dashboard/SideBar";
import './dashboard.css'
import { Outlet } from "react-router-dom";
import TopBar from "../components/Dashboard/TopBar";



export default function Dashboard(){
 
    return  (  <div className="position-relative dashboard">
    

        <SideBar/> 
      

    <Outlet />
    </div>
    );
     
}