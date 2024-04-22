import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import LayoutIndex from "./components/layout";
import Login from "./components/login/index";
function App() {
  const [login, setLogin] = useState(false);
  const onFinish = (data) => {
    if (data.user_name !== "" && data.password !== "") {
      setLogin(true);
    } else {
      setLogin(false);
    }
  };
  return (
    <>{login ? <LayoutIndex /> : <Login login={login} onFinish={onFinish} />}</>
  );
}

export default App;
