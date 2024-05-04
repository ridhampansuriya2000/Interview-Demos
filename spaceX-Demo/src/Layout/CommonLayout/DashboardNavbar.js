import PropTypes from "prop-types";
import { alpha, styled } from "@mui/material/styles";
import {Box, Stack, AppBar, Toolbar, IconButton, Button} from "@mui/material";
import Iconify from "components/Iconify";
import Searchbar from "./Searchbar";
import AccountPopover from "./AccountPopover";
import LanguagePopover from "components/LangSelector";
import React, {memo} from "react";
import {useTranslation} from "react-i18next";
import ManageAccountIcon from "../../components/Icon/Navbar/ManageAccountIcon";
import NotificationIcon from "../../components/Icon/Navbar/NotificationIcon";

// ----------------------------------------------------------------------//

const DRAWER_WIDTH = 280;
const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 64;

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: "none",
  backdropFilter: "blur(6px)",
  WebkitBackdropFilter: "blur(6px)", // Fix on Mobile
  backgroundColor: alpha('#fce7e7', 0.72),
  [theme.breakpoints.up("lg")]: {
    width: `calc(100% - ${DRAWER_WIDTH + 1}px)`,
  },
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: APPBAR_MOBILE,
  [theme.breakpoints.up("lg")]: {
    minHeight: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

// ----------------------------------------------------------------------//

DashboardNavbar.propTypes = {
  onOpenSidebar: PropTypes.func,
};

function DashboardNavbar({ onOpenSidebar }) {
  const { t } = useTranslation();


  return (
    <RootStyle>
      <ToolbarStyle>
        <IconButton
          onClick={onOpenSidebar}
          sx={{ mr: 1, color: "text.primary", display: { lg: "none" } }}
        >
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>

        <Searchbar />
        <Box sx={{ flexGrow: 1 }} />
        <Stack
            direction="row"
            alignItems="center"
            spacing={{ xs: 0.5, sm: 1.5 }}
            sx={{marginRight:'1rem'}}
        >
          {/*<Stack*/}
          {/*    sx={{borderRadius:'50%',backgroundColor:'#ffffff',height:'45px',width:'55px', alignItems:'center', justifyContent:'CENTER'}}>*/}
          {/*  <ManageAccountIcon/>*/}
          {/*</Stack>*/}
          <Stack
              sx={{borderRadius:'50%',backgroundColor:'#ffffff',height:'45px',width:'55px', alignItems:'center', justifyContent:'CENTER'}}>
            <NotificationIcon/>
          </Stack>
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          spacing={{ xs: 0.5, sm: 1.5 }}
        >
          {/*<Button*/}
          {/*    type="submit"*/}
          {/*    fullWidth*/}
          {/*    size='medium'*/}
          {/*    variant="contained"*/}
          {/*    onClick={()=>{}}*/}
          {/*>*/}
          {/*  {t("Log_Out")}*/}
          {/*</Button>*/}
          <LanguagePopover />
          <AccountPopover />
        </Stack>
      </ToolbarStyle>
    </RootStyle>
  );
}

export default memo(DashboardNavbar);