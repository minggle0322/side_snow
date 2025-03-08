import React from "react";
import Home from "./pages/main";
import Header from "./pages/header";

const App = () => {
  return (
    <div>
            <Header />
      <Home />  {/* Home 컴포넌트 표시 */}

    </div>
  );
};

export default App;