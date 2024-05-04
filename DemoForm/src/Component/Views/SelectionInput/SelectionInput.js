import * as React from 'react';
import TextField from '@mui/material/TextField';
import Select  from '@mui/material/Select';
import { styled } from '@mui/material/styles';


const StyledSelectField = styled(Select)(({ theme }) => ({
    display:'flex',
    color: '#ffffff',
    height:'35px',
    "& .MuiOutlinedInput-notchedOutline": {
        border: "2px solid #2e7d32",
        borderRadius: '40px',
    },
    '&:hover' : {
        border: 'unset'
    },
    "&:focus-within": {
        borderRadius: "5px",
        opacity: 1
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
        border: "2px solid #2e7d32"
    },
}));

export default StyledSelectField;
