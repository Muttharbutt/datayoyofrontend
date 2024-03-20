import "./App.css";
import React, { useEffect, useState } from 'react';
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
  // const [loggedIn, setLoggedIn] = useState(false);
  // useEffect(() => {
  //   console.log(cookies.get("id"))
  // },[])
  return (
    <BrowserRouter>
      <Routes>
      <Route index path="/" element={<Logout />} />
          <Route index path="login" element={<Login />} />
          <Route  path="emailconfirm" element={<EmailConfirm />} />
                <Route  path="passwordconfirm" element={<PasswordConfirm />} />
                <Route  path="table" element={<Table />} />
                <Route  path="Home" element={<Logout />} />
                <Route  path="tableone" element={<TableOne />} />
                <Route  path="stepone" element={<Stepone />} />
                <Route  path="steptwo" element={<Steptwo />} />
                <Route  path="stepthree" element={<Stepthree />} />
          {/* {loggedIn ?(
                <> 
                </>
            ):(  <> <Route  path="" element={<Logout />} /></>)} */}
         
      </Routes>
    </BrowserRouter>
  );
}

export default App;
