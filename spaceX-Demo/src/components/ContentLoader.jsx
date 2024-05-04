import React from "react";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
const ContentLoader = ({ isLoading, color="inherit" }) => {
  return (
      <>
        {isLoading ? (
            <Box sx={{ display: 'flex', width:'100%', justifyContent:'center', margin:'18px 0px' }}>
              <CircularProgress color={color}/>
            </Box>
        ) : null}
      </>
  );
};

export default ContentLoader;
