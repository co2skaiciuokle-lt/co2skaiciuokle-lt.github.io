import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AskingPage from "./components/askingpageaboutco2";
import DontKnows from "./components/dontknows";
import Knows from "./components/knows";

function App() {
  const [currentPage, setCurrentPage] = useState("");

  return (
    <>
      {currentPage === "" && <AskingPage handleCurrentPage={setCurrentPage} />}
      {currentPage === "yes" && <Knows handleCurrentPage={setCurrentPage} />}
      {currentPage === "no" && <DontKnows handleCurrentPage={setCurrentPage} />}
    </>
  );
}

export default App;
