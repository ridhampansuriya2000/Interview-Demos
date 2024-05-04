import React from "react";
const Loader = ({ isLoading }) => {
  return (
    <>
      {isLoading ? (
        <div className="mesh-loader">
          <div className="set-one">
            <div className="circle"></div>
            <div className="circle"></div>
          </div>
          <div className="set-two">
            <div className="circle"></div>
            <div className="circle"></div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Loader;
