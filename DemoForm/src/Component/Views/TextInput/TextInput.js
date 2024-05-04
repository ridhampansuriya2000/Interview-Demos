import * as React from 'react';
import TextField from '@mui/material/TextField';
import { alpha, styled } from '@mui/material/styles';


const StyledTextField = styled(TextField)(({ theme }) => ({
    // width: 300,
    color: theme.palette.success.main,
    '& .MuiOutlinedInput-root':{
      borderRadius: '40px',
        border:'2px solid #2e7d32',
        color: '#ffffff',
        width:'inherit',
        height:'35px',
        '&:hover focus': {
            borderColor: 'white',
        },
        'input': {
            '&::placeholder': {
                textOverflow: 'ellipsis !important',
                color: '#ffffff'
            }
        }
    },
}));

export default StyledTextField;
