import PropTypes from "prop-types";
import {memo, useEffect} from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
// material
import { styled } from "@mui/material/styles";
import { Box, Button, Drawer, Typography, Stack } from "@mui/material";
import useResponsive from "lib/hooks/useResponsive";
import Scrollbar from "components/Scrollbar";
import NavSection from "components/NavSection";
import navConfig from "./NavConfig";

/*----------------------Icons---------------------------*/
import FbIcone from "../../components/Icon/FbIcon";
import TwitterIcon from "../../components/Icon/TwitterIcon";
import LinkedInIcon from "../../components/Icon/LinkedInIcon";

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 300;

const RootStyle = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("lg")]: {
    flexShrink: 0,
    width: DRAWER_WIDTH,
  },
}));

// ----------------------------------------------------------------------

DashboardSidebar.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func,
};

function DashboardSidebar({ isOpenSidebar, onCloseSidebar }) {
  const { pathname } = useLocation();

  const isDesktop = useResponsive("up", "lg");

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        "& .simplebar-content": {
          height: 1,
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Box sx={{ px: 2.5, py: 3, display: "inline-flex" }}>
        <Typography component="h1" variant="h5" sx={{ color: "primary.main" }}>
          SpaceX
        </Typography>
      </Box>

      <NavSection navConfig={navConfig} />

      <Box sx={{ flexGrow: 1 }} />

      <Box sx={{  mt: 10, width:'90%', }}>
        <Stack
          alignItems="flex-end"
          spacing={3}
          sx={{ pt: 5, borderRadius: 2, position: "relative",width:'95%' }}
        >
          <Stack sx={{ textAlign: "end" }}>
            <Typography variant="body2" sx={{ color: "#000000",my:'5px' }}>
              FAQ
            </Typography>
          </Stack>

        </Stack>
        <Stack
            alignItems="flex-start"
            spacing={3}
            sx={{ pt: 1, position: "relative" }}
        >
        <Box sx={{
          width:'95%',
          borderBottom:'1px solid #C9C9C9',
        }} />
          <Box sx={{ marginTop:'10px !important', width:'100%' }}>
            <Typography
                        sx={{
                          width: '95%',
                          textAlign: "end",
                          fontFamily: 'Poppins',
                          fontStyle: 'normal',
                          fontWeight: '700',
                          fontSize: '30px',
                          // lineHeight: '45px',
                          color: '#575061'
                        }}>
              SX
            </Typography>
          </Box>
          <Stack direction='row' gap={1.5} sx={{width:'95%',justifyContent:'flex-end',marginTop:'10px !important'}}>
            <FbIcone/>
            <TwitterIcon/>
            <LinkedInIcon/>
          </Stack>
        </Stack>
      </Box>
    </Scrollbar>
  );

  return (
    <RootStyle>
      {!isDesktop && (
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: "#F7F7F7",
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}

      {isDesktop && (
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: "#F7F7F7",
              borderRightStyle: "dashed",
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </RootStyle>
  );
}
export default memo(DashboardSidebar);