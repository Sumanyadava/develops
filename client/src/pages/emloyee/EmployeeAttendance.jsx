import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { CSVLink } from "react-csv";

const EmployeeAttendance = ({ role, userNameCookie, emailCookie }) => {
  const [tableReport, setTableReport] = useState([]);
  const [workingHoursReq, setWorkingHourReq] = useState();
  const [searchParams] = useSearchParams();

  const userEmail = searchParams.get("email") || emailCookie;

  const generateDaysInMonth = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    // const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    const days = [];
    for (let i = 1; i <= currentDate.getDate(); i++) {
      const date = new Date(currentYear, currentMonth, i);
      days.push(date.toLocaleDateString());
    }

    return days;
  };

  //check if employee has attendance
  const hasAttendanceData = (date) => {
    return tableReport.some((ele) => {
      return new Date(ele.inTime).toLocaleDateString() === date;
    });
  };

  const headersCSV = [
    { label: "Index", key: "index" },
    { label: "Date", key: "date" },
    { label: "Checkin", key: "check_in" },
    { label: "Check Out", key: "check_out" },
    { label: "Attendance", key: "attendance" },

    role == 2
      ? { label: "Working Hours", key: "working_hours" }
      : { label: "", key: "" },

    role == 2 ? { label: "Review", key: "review" } : { label: "", key: "" },
  ];

  const csvLink = {
    filename: "EmployeeAttendance.csv",
    headers: headersCSV,
    data: generateDaysInMonth().map((date, index) => {
      const attendanceData = tableReport.find((ele) => {
        return new Date(ele.inTime).toLocaleDateString() === date;
      });

      const inTime = attendanceData?.inTime
        ? new Date(attendanceData.inTime).toLocaleTimeString()
        : "N/A";

      const outTime = attendanceData?.outTime
        ? new Date(attendanceData.outTime).toLocaleTimeString()
        : "N/A";

      const workingHours =
        attendanceData?.outTime && attendanceData?.inTime
          ? (
              (new Date(attendanceData.outTime) -
                new Date(attendanceData.inTime)) /
              (1000 * 60 * 60)
            ).toFixed(2)
          : "N/A";

      const review = attendanceData?.inTime
        ? (new Date(attendanceData.inTime).setHours(9, 0, 0, 0) -
            new Date(attendanceData.inTime)) /
            (1000 * 60) >
          0
          ? (
              (new Date(attendanceData.inTime).setHours(9, 0, 0, 0) -
                new Date(attendanceData.inTime)) /
              (1000 * 60)
            ).toFixed() + " min early"
          : Math.abs(
              (new Date(attendanceData.inTime).setHours(9, 0, 0, 0) -
                new Date(attendanceData.inTime)) /
                (1000 * 60)
            ).toFixed() + " min late"
        : "Absent";

      return {
        index: index + 1,
        date: date,
        check_in: inTime,
        check_out: outTime,
        attendance: inTime === "N/A" ? "absent" : "present",
        working_hours: workingHours,
        review: review,
      };
    }),
  };

  useEffect(() => {
    const inOutReport = async () => {
      try {
        const res = await axios.post(
          `${apiUrl}/api/check/inouttime`,
          {
            email: userEmail,
          }
        );
        // console.log(res.data.data);
        setTableReport(res.data.data.inOutTime);
        setWorkingHourReq(res.data.data.workingHours);
      } catch (error) {
        console.log("error here ", error);
      }
    };
    if (userEmail) {
      inOutReport();
    }
  }, [userNameCookie, userEmail]);

  return (
    <div>
      <main>
        <div className="show_emp_data flex justify-around items-center p-4 bg-gray-600">
          <div className="emp_name text-3xl">{userEmail || userNameCookie}</div>
          <div className="export_excel">
            <button className="btn btn-success">
              <CSVLink {...csvLink}>Export to Excel</CSVLink>
            </button>
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
                {role == 2 ? (
                  <>
                    <th>Working Hour = {workingHoursReq}</th>
                    <th>Review ( 9:00 AM )</th>
                  </>
                ) : (
                  ""
                )}
              </tr>
            </thead>
            <tbody>
              {/* {tableReport.map((ele, index) => {
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
                    {role == 2 ? (
                      <>
                        <td>
                          {ele.outTime && ele.inTime
                            ? (
                                (new Date(ele.outTime) - new Date(ele.inTime)) /
                                (1000 * 60 * 60)
                              ).toFixed(2)
                            : "N/A"}
                        </td>
                        <td 
                        style={{
                          color:
                            ele.inTime
                              ? (new Date(ele.inTime).setHours(9, 0, 0, 0) -
                                  new Date(ele.inTime)) /
                                  (1000 * 60) >
                                0
                                ? "green"
                                : "red"
                              : "inherit",
                        }}  
                        
                        >
                          {ele.inTime
                            ? (new Date(ele.inTime).setHours(9, 0, 0, 0) -
                                new Date(ele.inTime)) /
                                (1000 * 60) >
                              0
                              ? (
                                  (new Date(ele.inTime).setHours(9, 0, 0, 0) -
                                    new Date(ele.inTime)) /
                                  (1000 * 60)
                                ).toFixed() + " min early"
                              : Math.abs(
                                  (new Date(ele.inTime).setHours(9, 0, 0, 0) -
                                    new Date(ele.inTime)) /
                                    (1000 * 60)
                                ).toFixed() + " min late"
                            : "Absent"}
                        </td>
                      </>
                    ) : (
                      ""
                    )}
                  </tr>
                );
              })}  */}

              {generateDaysInMonth().map((date, index) => {
                const attendanceData = tableReport.find((ele) => {
                  return new Date(ele.inTime).toLocaleDateString() === date;
                });

                const inTime = attendanceData?.inTime
                  ? new Date(attendanceData.inTime).toLocaleTimeString()
                  : "N/A";
                const outTime = attendanceData?.outTime
                  ? new Date(attendanceData.outTime).toLocaleTimeString()
                  : "N/A";

                return (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <td>{date}</td>
                    <td>{inTime}</td>
                    <td>{outTime}</td>
                    <td style={{
                            color:inTime == "N/A"
                            ? "red"
                            : "green"
                              
                          }}
                          
                          >{inTime === "N/A" ? "absent" : "Present"}</td>
                    {role == 2 ? (
                      <>
                        <td>
                          {attendanceData?.outTime && attendanceData?.inTime
                            ? (
                                (new Date(attendanceData.outTime) -
                                  new Date(attendanceData.inTime)) /
                                (1000 * 60 * 60)
                              ).toFixed(2)
                            : "N/A"}
                        </td>
                        <td
                          style={{
                            color: attendanceData?.inTime
                              ? (new Date(attendanceData.inTime).setHours(
                                  9,
                                  0,
                                  0,
                                  0
                                ) -
                                  new Date(attendanceData.inTime)) /
                                  (1000 * 60) >=
                                0
                                ? "green"
                                : "red"
                              : "inherit",
                          }}
                        >
                          {attendanceData?.inTime
                            ? (new Date(attendanceData.inTime).setHours(
                                9,
                                0,
                                0,
                                0
                              ) -
                                new Date(attendanceData.inTime)) /
                                (1000 * 60) >
                              0
                              ? (
                                  (new Date(attendanceData.inTime).setHours(
                                    9,
                                    0,
                                    0,
                                    0
                                  ) -
                                    new Date(attendanceData.inTime)) /
                                  (1000 * 60)
                                ).toFixed() + " min early"
                              : Math.abs(
                                  (new Date(attendanceData.inTime).setHours(
                                    9,
                                    0,
                                    0,
                                    0
                                  ) -
                                    new Date(attendanceData.inTime)) /
                                    (1000 * 60)
                                ).toFixed() + " min late"
                            : "Absent"}
                        </td>
                      </>
                    ) : (
                      ""
                    )}
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
