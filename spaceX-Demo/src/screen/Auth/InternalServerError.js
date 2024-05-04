import React from "react";

const InternalServerError = () => {
  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <div className="text-center">
        <h1 className="display-1 fw-bold">500</h1>
        <p className="fs-3">
          <span className="text-danger">Opps!</span> Internal Server Error.
        </p>
        <p className="lead">
          The Server encountered an internal error or misconfiguration and was
          unable to complete your request.
        </p>
        <a href="/" className="btn btn-primary">
          Go Home
        </a>
      </div>
    </div>
  );
};

export default InternalServerError;
