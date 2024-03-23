import "./App.css";
import { BrowserRouter, Routes, Route,Navigate  } from "react-router-dom";
import Login from "./components/login/Login";
import EmailConfirm from "./components/emailconfirm/EmailConfirm";
import PasswordConfirm from "./components/passwordconfirm/PasswordConfirm";
import Table from "./components/table/Table";
import TableOne from "./components/table1/TableOne";
import Logout from "./components/Logout/Logout";
import Stepone from "./components/stepone/Stepone";
import Steptwo from "./components/steptwo/steptwo";
import Stepthree from "./components/stepthree/stepthree";
import Cookies from 'universal-cookie';

function App() {
  const cookies = new Cookies();
  const hasIdCookie = cookies.get("id");
  return (
    <BrowserRouter>
      <Routes>
      <Route index path="/" element={<Logout />} />
          <Route index path="login" element={<Login />} />
          <Route  path="emailconfirm" element={<EmailConfirm />} />
                <Route  path="passwordconfirm" element={<PasswordConfirm />} />
                <Route  path="table" element={<Table />} />
                <Route  path="Home" element={<Logout />} />
                <Route path="/" element={hasIdCookie ? <Navigate to="/table" /> : <Navigate to="/Home" />} />
                <Route path="/tableone" element={hasIdCookie ? <TableOne /> : <Navigate to="/Home" />} />
      <Route path="/stepone" element={hasIdCookie ? <Stepone /> : <Navigate to="/Home" />} />
      <Route path="/steptwo" element={hasIdCookie ? <Steptwo /> : <Navigate to="/Home" />} />
      <Route path="/stepthree" element={hasIdCookie ? <Stepthree /> : <Navigate to="/Home" />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
