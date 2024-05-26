import React from "react";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EmployeeHome = () => {
  const [employee, setEmployee] = useState("suman");
  const [currentTime, setCurrentTime] = useState(new Date());

  const [checkIn, setCheckIn] = useState(true);
  const [checkOut, setCheckOut] = useState();

  const [checkInTime, setCheckInTime] = useState("");
  const [checkOutTime, setCheckOutTime] = useState("");


  const date = `${currentTime.getDate()} / ${currentTime.getMonth()} / ${currentTime.getFullYear()}`;

  useEffect(() => {
    const timerID = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => {
      clearInterval(timerID);
    };
  }, []);



  const handleCheckIn = () => {
    setCheckIn(false);
    setCheckOut(true);
    const newCheckInTime = currentTime.toLocaleTimeString();
    setCheckInTime(newCheckInTime);
    toast.success("check in Successfull");

  };

  const handleCheckOut = () => {
    setCheckIn(false);
    setCheckOut(false);
    toast.success("check out Successfull");

    const newCheckOutTime = currentTime.toLocaleTimeString();
    setCheckOutTime(newCheckOutTime);

  };

  return (
    <div>
      <h1 className="flex justify-end text-3xl p-5 font-bold">{date}</h1>

      {/* ---clock in ------ */}

      <div className="button wrapper flex flex-col ">
        <button
          disabled={!checkIn}
          className="btn btn-primary  m-5 py-20 text-3xl"
          onClick={handleCheckIn}
        >
          Check In
        </button>
        <button
          disabled={!checkOut}
          className="btn btn-secondary m-5 py-20 text-3xl"
          onClick={handleCheckOut}
        >
          Check out
        </button>
      </div>
      {/* ---------------instruction for user -------- */}
      <div className="guide text-center m-5 font-bold">
      {checkIn ? (
        " check in to mark you attendance for today "
      ) : (
        <div>
          your attende has been marked for today{" "}
          <h1>your check in time: {checkInTime}</h1>
          {
            checkOut ? "": <h1>your check out time: {checkOutTime}</h1>
          }
        </div>
      )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default EmployeeHome;
