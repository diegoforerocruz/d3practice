import { React, useState } from "react";
import Testo from "./testo";

const App = () => {
  const [counter, setCounter] = useState(0);

  return (
    <div className="App">
      <Testo onClick={() => setCounter(counter + 1)} person="pedro"></Testo>
      <Testo onClick={() => setCounter(counter + 1)} person="juan"></Testo>
      <Testo onClick={() => setCounter(counter + 1)} person="laura"></Testo>
      Times clicked: {counter}
    </div>
  );
};

export default App;
