import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login/Login";
import EmailConfirm from "./components/emailconfirm/EmailConfirm";
import PasswordConfirm from "./components/passwordconfirm/PasswordConfirm";
import Table from "./components/table/Table";
import TableOne from "./components/table1/TableOne";
import Logout from "./components/Logout/Logout";
import Stepone from "./components/stepone/Stepone";
import Steptwo from "./components/steptwo/steptwo";
import Stepthree from "./components/stepthree/stepthree";
function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route index path="login" element={<Login />} />
          <Route  path="emailconfirm" element={<EmailConfirm />} />
          <Route  path="passwordconfirm" element={<PasswordConfirm />} />
          <Route  path="table" element={<Table />} />
          <Route  path="logout" element={<Logout />} />
          <Route  path="tableone" element={<TableOne />} />
          <Route  path="stepone" element={<Stepone />} />
          <Route  path="steptwo" element={<Steptwo />} />
          <Route  path="stepthree" element={<Stepthree />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
