import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EmployeeHome = ({ emailCookie }) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  
  const [currentTime, setCurrentTime] = useState(new Date());

  const [checkIn, setCheckIn] = useState(true);
  const [checkOut, setCheckOut] = useState();

  const [checkInTime, setCheckInTime] = useState("");
  const [checkOutTime, setCheckOutTime] = useState("");
  // let location = useLocation()

  //clock displaying time
  const date = `${currentTime.getDate()} / ${currentTime.getMonth()} / ${currentTime.getFullYear()}`;

  //update current time every 1 sec
  useEffect(() => {
    const timerID = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => {
      clearInterval(timerID);
    };
  }, []);

  //validating check in / out
  useEffect(() => {
    const CheckInOutTime = async () => {
      try {
        const res = await axios.post(`${apiUrl}/api/check/time`, {
          email: emailCookie,
        });
        console.log(res)
        const { inTime, outTime } = res.data.data;
        const lastCheckInDate = inTime ? new Date(inTime).getDate() : null;
        const lastCheckOutDate = outTime ? new Date(outTime).getDate() : null;

        if (lastCheckInDate == currentTime.getDate()) {
          setCheckIn(false);
          setCheckOut(true);
          setCheckInTime(new Date(inTime).toLocaleTimeString());
        } else {
          setCheckIn(true);
          setCheckOut(false);
          setCheckInTime("");
        }
        if (lastCheckOutDate == currentTime.getDate()) {
          setCheckOut(false);
          setCheckOutTime(new Date(outTime).toLocaleTimeString());
        } else if (lastCheckInDate !== currentTime.getDate()) {
          setCheckOut(false);
          setCheckOutTime("");
        }
      } catch (error) {
        console.log("error here ", error);
      }
    };

    CheckInOutTime();
  }, [emailCookie, currentTime.getDate()]);

  const handleCheckIn = () => {
    // console.log(currentTime);
    axios
      .post(`${apiUrl}/api/check/in`, {
        email: emailCookie,
        inTime: currentTime,
      })
      .then((res) => {
        toast.success("check in Successfull");

        setCheckIn(false);
        setCheckOut(true);
        const newCheckInTime = new Date(currentTime).toLocaleTimeString();
        setCheckInTime(newCheckInTime);
      })
      .catch((error) => {
        console.log("error at check in ", error);
        toast.error("check in failed");
      });
  };

  const handleCheckOut = () => {
    axios
      .post(`${apiUrl}/api/check/out`, {
        email: emailCookie,
        outTime: currentTime,
      })
      .then((res) => {
        toast.success("check out Successfull");

        setCheckOut(false);

        const newCheckOutTime = new Date(currentTime).toLocaleTimeString();
        setCheckOutTime(newCheckOutTime);
      })
      .catch((err) => {
        toast.error("check out failed");
        console.log(err);
      });
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
            {checkOut ? "" : <h1>your check out time: {checkOutTime}</h1>}
          </div>
        )}
      </div>
      
    </div>
  );
};

export default EmployeeHome;
