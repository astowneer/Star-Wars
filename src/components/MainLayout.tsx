import { Outlet } from "react-router";
import { Header } from "./Header";

export const MainLayout = () => {
  return (
    <div className="min-h-screen bg-center bg-starwars px-5 pt-5 pb-0 flex flex-col">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};
