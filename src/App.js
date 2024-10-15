import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { SidebarComponent } from "./components/layout/SidebarComponent";
import Routes from "./routes";

function App() {
  return (
    <Router>
      <div className="flex">
        <SidebarComponent />

        <div className="flex-1 p-4">
          <Routes />
        </div>
      </div>
    </Router>
  );
}

export default App;
