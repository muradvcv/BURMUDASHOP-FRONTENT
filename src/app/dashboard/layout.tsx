import Sidebar from "@/Components/Dashboard/Sidebar";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const Dashboard = ({ children }: Props) => {
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className="">
       <Sidebar/>
      </aside>

      {/* Right Side */}
      <div className="flex flex-1 flex-col">
        {/* Navbar */}
        <header className="h-16 border-b flex items-center px-6">
          Navbar
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;