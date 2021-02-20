import { useState } from "react";
import Routes from "./routes";
import SidebarContext from "./context/sidebarContext";

function App() {
  const [sidebar, setSidebar] = useState({ open: false });

  return (
    <SidebarContext.Provider value={[sidebar, setSidebar]}>
      <Routes />
    </SidebarContext.Provider>
  );
}

export default App;
