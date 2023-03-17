import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";


function App() {

    const [ state, setState ] = useState();

    return (
      <div className="App">
          <BrowserRouter>
              <Routes>
                  <Route path="/chat" element={<Chat />} />
              </Routes>
          </BrowserRouter>
      </div>
    );
}

export default App;
