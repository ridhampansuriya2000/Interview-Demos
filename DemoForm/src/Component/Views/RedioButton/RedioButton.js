import * as React from 'react';
import Radio from '@mui/material/Radio';
import { styled } from '@mui/material/styles';


const StyledRedioButton = styled(Radio)(({ theme }) => ({
    color: theme.palette.success.main,
    '& .MuiOutlinedInput-root':{
      borderRadius: '40px',
        border:'2px solid #2e7d32',
        color: '#ffffff',
        width:'inherit',
    },
}));

export default StyledRedioButton;
