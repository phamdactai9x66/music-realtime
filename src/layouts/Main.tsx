import React from "react";
import { Outlet } from "react-router";

const Main = () => {
  return (
    <div>
      <h1>This is container</h1>

      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Main;
