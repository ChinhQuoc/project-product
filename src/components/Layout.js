import React from 'react';
import { Route, Routes} from "react-router-dom";
import Home from "./Home/Home";
import Detail from "./Detail/Detail";
import Create from "./Create/Create";

function Layout() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/create/:id" element={<Create />} />
      </Routes>
    </div>
  );
}

export default Layout;
