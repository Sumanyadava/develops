import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
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
import authChecker from "./utils/helper.util.jsx";
import Cookies from "js-cookie";


function App() {
  const [role, setRole] = useState(null);
  const [userNameCookie,setUserNameCookie] = useState()
  const [emailCookie,setEmailCookie] = useState()
  let location = useLocation()


  //reading the cookie on path change to ensure authentication
  useEffect(() =>{
    const userDataCookie = Cookies.get("userDATA");
    if (!userDataCookie) {
      setRole('0');
    } else {
      try {
        const { userRole,username,email } = JSON.parse(userDataCookie);
        setRole(userRole);
        setUserNameCookie(username)
        setEmailCookie(email)
      } catch (error) {
        console.error('Error parsing userDATA cookie:', error);
        setRole('0');
      }
    }
  }, [location.pathname]);

  return (
    <div className="h-screen w-full ">
      
        

        <Header role={role} setRole={setRole} userNameCookie={userNameCookie} />
        <Routes>
          <Route
            path="/signin" 
            element={authChecker(role == 3 ? <Signup role={role} /> : <NotAuth />)}
          />

          <Route path="/" element={<Login role={role} setRole={setRole} />} />

          <Route
            path="/dashboard"
            element={authChecker(
              role == 3 ? <AdminHome role={role} /> : <Home role={role} emailCookie={emailCookie} />
            )
            }
          />

          <Route
            path="/attendance"
            element={authChecker(<EmployeeAttendance role={role} userNameCookie={userNameCookie} emailCookie={emailCookie} />)}
          />

          <Route
            path="/attendancereport"
            element={authChecker(<EmployeeList role={role} emailCookie={emailCookie} />)}
          />

          <Route path="*" element={<ErrorPage />} />
        </Routes>
    </div>
  );
}



export default App;
