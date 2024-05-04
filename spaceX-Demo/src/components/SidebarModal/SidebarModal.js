import React from "react";
import Box from "@mui/material/Box";
import CloseIcon from '@mui/icons-material/Close';
import { styled } from "@mui/material/styles";


const MainStyle = styled("div")(({theme}) => ({
    position: 'fixed',
    width: `calc(100% - 280px)`,
    height: `calc(100% - 64px)`,
    backgroundColor: 'rgba(128,128,128,0.5)',
    top: '64',
    right: '0',
    [theme.breakpoints.down("lg")]: {
        width: `calc(100%)`,
    },
}));

const SidebarModal = ({isOpen, onClose, body, title}) =>{

    React.useEffect(()=>{
        if(!isOpen) document.getElementById('drawer-content').style.maxWidth = '0px'
    },[isOpen])

    return(
        <MainStyle>
            <Box sx={{
                position:'absolute', width:'100%',height:'100%',top:'0',left:'0',zIndex:'99999'
            }}>
                <Box sx={{
                    maxWidth:'520px',
                    transition:' 3s',
                    position:'absolute', width: isOpen ? '100%'  : '0px',height:'100%',background:'rgba(249,249,249,1)',top:'0',right:'0'
                }}
                id='drawer-content'>
                    <Box sx={{
                        height : '60px',
                        borderBottom : '2px solid #d3d3d373',
                        display: 'flex',
                        justifyContent:'space-between',
                        alignItems: 'center',
                        padding:'18px',
                        transition : 'width 3s'
                    }}>
                        <h3>{title}</h3>
                        <Box sx={{
                            display:'flex',
                            alignItems:'center',
                            justifyContent:'center',
                            borderRadius:'8px',
                            height:'38px',
                            width:'38px',
                            cursor:'pointer',
                            ':hover':{
                                backgroundColor:"#a3a7ac",
                            }
                        }}
                            onClick={onClose}
                        >
                            <CloseIcon />
                        </Box>
                    </Box>
                    {body}
                </Box>
            </Box>
        </MainStyle>
    )
}

export default SidebarModal;