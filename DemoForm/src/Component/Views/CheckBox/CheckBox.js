import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import { alpha, styled } from '@mui/material/styles';


const StyledCheckbox = styled(Checkbox)(({ theme }) => ({
    color: theme.palette.success.main,
    '& .MuiOutlinedInput-root':{
      borderRadius: '40px',
        border:'2px solid #2e7d32',
        color: '#ffffff',
        width:'inherit',
    },
}));

export default StyledCheckbox;
