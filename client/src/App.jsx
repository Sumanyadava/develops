import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import EmployeeAttendance from "./pages/emloyee/EmployeeAttendance";
import AdminHome from "./pages/AdminHome";
import ErrorPage from "./pages/ErrorPage";
import EmployeeList from "./pages/EmployeeList";
import Header from "./components/Header";
import NotAuth from "./components/NotAuth";

function App() {
  const [role, setRole] = useState(3);
  const [user, setUser] = useState({});

  return (
    <div className="h-screen w-screen ">
      <BrowserRouter>
        <Header role={role} setRole={setRole} />
        <Routes>
          <Route
            path="/signin"
            element={role == 3 ? <Signup role={role} /> : <NotAuth />}
          />

          <Route path="/" element={<Login role={role} setRole={setRole} />} />

          <Route
            path="/dashboard"
            element={
              role == 3 ? <AdminHome role={role} /> : <Home role={role} />
            }
          />

          <Route
            path="/attendance"
            element={<EmployeeAttendance role={role} />}
          />

          <Route
            path="/attendancereport"
            element={<EmployeeList role={role} />}
          />

          {/* <Route path="/admin" element={<AdminHome role={role} />} /> */}

          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

//todo: how can i use react router as header and element

export default App;
