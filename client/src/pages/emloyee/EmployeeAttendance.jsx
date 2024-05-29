import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useParams, useSearchParams } from "react-router-dom";

const EmployeeAttendance = ({ role, userNameCookie, emailCookie }) => {
  const [tableReport, setTableReport] = useState([]);
  const [searchParams] = useSearchParams()
  
  const userEmail = searchParams.get('email') || emailCookie;

  useEffect(() => {
    console.log(userEmail);
    const inOutReport = async () => {
      try {
        const res = await axios.post(
          "http://localhost:3002/api/check/inouttime",
          {
            email: userEmail,
          }
        );
        // console.log(res.data.data);
        setTableReport(res.data.data);
      } catch (error) {
        console.log("error here ", error);
      }
    };
    if (userEmail) {
      inOutReport();
    }
  }, [userNameCookie, userEmail,]);

  return (
    <div>
      <main>
        <div className="show_emp_data flex justify-around items-center p-4 bg-gray-600">
          <div className="emp_name text-3xl">{userEmail || userNameCookie}</div>
          <div className="export_excel">
            <button className="btn btn-success">Export to Excel</button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Date</th>
                <th>Checkin</th>
                <th>Check Out</th>
                <th>Attendance </th>
              </tr>
            </thead>
            <tbody>
              {tableReport.map((ele, index) => {
                const inTime = ele.inTime
                  ? new Date(ele.inTime).toLocaleTimeString()
                  : "N/A";
                const outTime = ele.outTime
                  ? new Date(ele.outTime).toLocaleTimeString()
                  : "N/A";
                const day =
                  ele.inTime == "N/A"
                    ? "N/A"
                    : new Date(ele.inTime).toLocaleDateString();

                return (
                  <tr key={ele._id}>
                    <th>{index + 1}</th>
                    <td>{day}</td>
                    <td>{inTime}</td>
                    <td>{outTime}</td>
                    <td>{inTime == "N/A" ? "absent" : "Present"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default EmployeeAttendance;
