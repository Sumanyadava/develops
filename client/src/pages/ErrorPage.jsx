import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div>
      <h1 className="text-center m-20 text-6xl">
        Error 404 :-route not found{" "}
      </h1>
      <Link to="/" className="bg-red-500 text-center p-2 m-24">
        back to home
      </Link>
    </div>
  );
};

export default ErrorPage;
