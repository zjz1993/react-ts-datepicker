import * as React from "react";
import { render } from "react-dom";
import DatePicker from "./datepicker/index";

function App() {
  return (
    <div className="App">
      <DatePicker />
    </div>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
