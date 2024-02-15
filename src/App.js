import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login/Login";
import EmailConfirm from "./components/emailconfirm/EmailConfirm";
import PasswordConfirm from "./components/passwordconfirm/PasswordConfirm";
import Table from "./components/table/Table";
import Logout from "./components/Logout/Logout";
function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route index path="login" element={<Login />} />
          <Route  path="emailconfirm" element={<EmailConfirm />} />
          <Route  path="passwordconfirm" element={<PasswordConfirm />} />
          <Route  path="table" element={<Table />} />
          <Route  path="logout" element={<Logout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
