import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";

const Dashboard = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-[200px] md:min-h-screen bg-softWhite text-charcoalGray w-full">
      <div className="w-full md:w-[20%] bg-white shadow-sm body-font">
        <Sidebar />
      </div>
      <div className="w-full md:w-[80%] flex-1 p-8 overflow-y-auto body-font bg-softWhite">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
