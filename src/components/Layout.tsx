import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";

const Layout = () => {
  return (
    <div className="Layout">
      <header>
        <img src="/logo.svg" alt="" />
        <h2>Biogas Proximate Analysis Calculator</h2>
      </header>

      <div className="main">
        <SideBar />

        <div className="outlet">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
