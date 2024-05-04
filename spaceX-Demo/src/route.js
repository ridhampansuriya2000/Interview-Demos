import React, {lazy, memo} from "react";
import { Route, Routes } from "react-router-dom";
import navConfig from "./Layout/CommonLayout/NavConfig";
const PrivateRoute = lazy(() => import("Layout/PrivateRoute"));
const InternalError = lazy(() => import("screen/Auth/InternalServerError"));

const AppRoutes = () => {

    const [routList,setRoutList] = React.useState([]);

    React.useEffect(()=>{
        setRoutList(()=>[...navConfig]);
    },[])

    const loading = (
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
  );
  return (
    <React.Suspense fallback={loading}>
      <Routes>
        <Route path="/500" element={<InternalError />} />
      </Routes>
      <PrivateRoute navConfig={routList} />
    </React.Suspense>
  );
};

export default memo(AppRoutes);
