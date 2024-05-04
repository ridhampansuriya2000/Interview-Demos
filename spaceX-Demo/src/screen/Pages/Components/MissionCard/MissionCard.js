import React from "react";
import style from './MissionCard.module.css'
import moment from "moment";
import Box from "@mui/material/Box";
import RocketIcon from '@mui/icons-material/Rocket';
import LandscapeIcon from '@mui/icons-material/Landscape';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import NumbersIcon from '@mui/icons-material/Numbers';

const MissionCard = (props) => {
    const {
        cardDetails: {
            mission_name = '',
            launch_date_local = '',
            flight_number = '',
            mission_patch_blobObj = '',
            launch_site = {site_name: ''},
            rocket = {rocket_name: '', rocket_type: ''},
            links = {mission_patch_small: ''}
        }
    } = props;
    return (
        <Box className={style.cardBody}>
            <div className={style.missionDetails}>
                <div >
                    <p>#{flight_number}</p>
                    {/*<p>{mission_name}</p>*/}
                </div>
                <div className={style.missionName}>
                    <p>{mission_name}</p>
                </div>
                <div>
                    {links?.mission_patch_small && <img src={links?.mission_patch_small} width='80px' height='80px'/>}
                </div>
            </div>


            <div className={style.launchDate}>
                <div>
                    <p className={style.alignCenter}>Site &nbsp; <LandscapeIcon /></p>
                    <p className={style.alignCenter}>{launch_site?.site_name ?? ''}</p>
                    <p className={style.alignCenter}>Lunch Date </p>
                    <p className={style.alignCenter}>{moment(launch_date_local).format('ll')}<CalendarMonthIcon/></p>
                </div>
                <div className={style.justifyEnd}>
                    <p className={style.alignCenter}>{rocket?.rocket_name ?? ''}<RocketIcon/></p>
                    <p>Type: </p><p className={style.alignCenter}>{rocket?.rocket_type ?? ''}</p>
                </div>
            </div>
        </Box>
    )
}

export default MissionCard;