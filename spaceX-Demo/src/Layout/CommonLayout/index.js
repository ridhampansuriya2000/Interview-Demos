import React, {memo, useCallback, useMemo, useState} from "react";
import { Route, Routes } from "react-router-dom";
import { styled } from "@mui/material/styles";
import DashboardNavbar from "./DashboardNavbar";
import DashboardSidebar from "./DashboardSidebar";



const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const RootStyle = styled("div")({
  display: "flex",
  minHeight: "100%",
  overflow: "hidden",
});

const MainStyle = styled("div")(({ theme }) => ({
    flexGrow: 1,
    // overflowY: 'auto !important',
    maxHeight: 'calc(100vh)',
    paddingTop: APP_BAR_MOBILE,
    // paddingBottom: theme.spacing(10),
    width: `calc(100% - ${280 + 1}px)`,
    [theme.breakpoints.up("lg")]: {
        // paddingTop: APP_BAR_DESKTOP + 24,
        // paddingLeft: theme.spacing(2),
        // paddingRight: theme.spacing(2),
    },
}));

const ChiledStyle = styled("div")(({ theme }) => ({
    flexGrow: 1,
    overflowY: 'auto !important',
    maxHeight: 'calc(100vh - 64px)',
    paddingBottom: theme.spacing(10),
}));

// ----------------------------------------------------------------------

function CommonLayout({ navConfig : routes }) {
  const [open, setOpen] = useState(false);

    const switchRoutes = useCallback((routes) =>
        { return routes?.map((prop, key) => {
            return (
                <Route
                    exact
                    path={prop.path}
                    element={prop.component}
                    key={key}
                />
            );
        })}
,[routes]);


  return (
    <RootStyle className={'xyz'}>
      <DashboardNavbar onOpenSidebar={() => setOpen(true)} />
      <DashboardSidebar
        isOpenSidebar={open}
        onCloseSidebar={() => setOpen(false)}
      />
        <MainStyle className={'abcd'}>
        <ChiledStyle id='scrollableDiv'>
            <Routes>
                {switchRoutes(routes)}
            </Routes>
        </ChiledStyle>
        </MainStyle>
    </RootStyle>
  );
}

export default memo(CommonLayout);
