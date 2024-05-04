import './App.css';
import React from "react";
import StyledTextField from "./Component/Views/TextInput/TextInput";
import SignUp from "./Component/SignUp/SignUp";

function App() {
    const [state,setState] = React.useState()

  return (
    <div className="App">
          <SignUp />
    </div>
  );
}

export default App;
