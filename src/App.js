import React from "react";
import Styledtable from "./components/Table1/Styledtable";
import { columnDataaa, mokeJsonData } from "./components/Data/MokeJson";

function App() {
  const logDataReceived = (newData) => {
    console.log(newData);
  };
  return (
    <div className="App">
      <div style={{ width: "100%" }}>
        <Styledtable
          tableData={mokeJsonData}
          columnData={columnDataaa}
          newDataCallback={logDataReceived}
          mainTitle='טבלה ללא עריכה'
        />
      </div>
    </div>
  );
}

export default App;
