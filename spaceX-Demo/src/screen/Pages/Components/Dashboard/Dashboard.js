import React, {memo} from "react";
import {Container, Typography} from "@mui/material";
import Grid from "@mui/material/Grid";
import InfiniteScroll from 'react-infinite-scroll-component';
import {useDispatch, useSelector} from "react-redux";
import moment from "moment";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import RocketIcon from '@mui/icons-material/Rocket';

/*---------------------Component-----------------------*/
import {getDashboardData} from "../../../../store/dashboard/DashboardAction";
import Loader from "../../../../components/Loader";
import MissionCard from "../../Components/MissionCard/MissionCard";
import ContentLoader from "../../../../components/ContentLoader";
import SidebarModal from "../../../../components/SidebarModal/SidebarModal";

/*---------------------Style-----------------------*/
import style from './Dashboard.module.css'

function Dashboard() {

    const dispatch = useDispatch();
    const data = useSelector((state) => state.dashboard.data)

    const [haseMore, setHasMore] = React.useState(true);
    const [isOpen, setIsOpen] = React.useState(false);
    const [modalData, setModal] = React.useState({});

    React.useEffect(() => {
        fetchData()
    }, []);

    const fetchData = async () => {
        try {
            const res = haseMore && await dispatch(getDashboardData({
                apiParams: `limit=25&&offset=${data?.length}`,
                callBackFun : setBlobObjForImg,
            }))
            if (!res?.apiRes?.lastApiRes?.payload?.length) {
                setHasMore(false);
            }
        } catch (e) {
            console.log("error in fetch data from api",e)
        }
    }

    let tempArr = [];
    const setBlobObjForImg = async (data) =>{
        const getNewArray = async (data,index=0) =>{
            return await fetch(
                `${data[index]?.links?.mission_patch}`,
                {
                    mode: 'no-cors',
                    method: 'GET',
                    headers: {
                        'Content-Type': "image/png",
                        'Access-Control-Allow-Origin': '*'
                    },
                }
            ).then(async (res) => {
                let blobObj = await res.blob();
                let obj = {...data[index], mission_patch_blobObj : await URL.createObjectURL(blobObj)};
                tempArr.push(obj);
                if(data?.length -1 > index){
                    await getNewArray(data,index + 1);
                }else {
                    return tempArr
                }
            })
                .catch((error) => {
                    console.log("error in fetch data from api",error)
                });
        };
        await getNewArray(data,0);
        return tempArr;
    }

    const sidebarModalbody= () =>(
        <div className={style.container}>

            {modalData?.links?.video_link && <div className={style.mediaContainer}>
                <iframe width="350" height="215" src={`https://www.youtube.com/embed/${modalData?.links?.video_link?.split('watch?v=')[1]}?autoplay=1`}
                        title="YouTube video player" frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen />
            </div>}

            <div className={style.itemContainer}>
                <div className={style.items}>
                    <div>Mission</div>
                    <div className={style.textBold}>{modalData?.mission_name}</div>
                </div>
                <div className={style.items}>
                    <div>Category</div>
                    <div className={style.textBold}>{modalData?.rocket?.rocket_name}</div>
                </div>
                <div className={style.items}>
                    <div>Type</div>
                    <div className={style.textBold}>{modalData?.rocket?.rocket_type} <RocketIcon /></div>
                </div>
                <div className={style.items}>
                    <div>Fligh Number</div>
                    <div className={style.textBold}>#{modalData?.flight_number}</div>
                </div>
                <div className={style.items}>
                    <div>Lunch Date</div>
                    <div className={style.textBold}>{moment(modalData?.launch_date_local).format('ll')} <CalendarMonthIcon/></div>
                </div>
                <div className={style.items}>
                    <div>Status</div>
                    <div className={modalData?.launch_success ? style.textSuccess : style.textFailed}>{modalData?.launch_success ? 'Success' : 'Failed'}</div>
                </div>
                {!modalData?.launch_success &&
                <div>
                    <div className={style.textBold}>Reason for failure :</div> {modalData?.launch_failure_details?.reason}
                </div>}
            </div>

            {modalData?.details &&
            <div className={style.details}>
                <p >More Details</p>{modalData?.details}
            </div>}
            <div className={style.linkDetails}>
                Show full article <a href={modalData?.links?.article_link} target='_blank' rel="noopener noreferrer">Click hear</a>
            </div
            ><div className={style.linkDetails}>
                Show full wikipedia <a href={modalData?.links?.wikipedia} target='_blank' rel="noopener noreferrer">Click hear</a>
            </div>
        </div>
    )

    return (
        <Container maxWidth="xl">
            {isOpen && <SidebarModal isOpen={isOpen} onClose={()=>setIsOpen(false)} body={sidebarModalbody()} title='Lunch Details'/>}
            <Typography variant="h4" sx={{mb: 5}}>
                Finance Accounting
            </Typography>
            <Loader isLoading={!data?.length}/>
            <InfiniteScroll
                dataLength={data?.length ?? 0}
                next={() => fetchData()}
                hasMore={haseMore}
                hasChildren
                style={{
                    overflow: 'hide',
                }}
                scrollableTarget="scrollableDiv"
                loader={<ContentLoader isLoading color={'primary'}/>}>
                <Grid container spacing={2} sx={{display: 'flex'}}>
                    {(data?.length > 0) && data?.map((item, index) => (
                        <Grid
                            item
                            xs={12}
                            sm={6}
                            md={6}
                            lg={4}
                            xl={4}
                            key={index}
                            onClick={()=>{setModal(item); setIsOpen(true)}}
                        >
                            <MissionCard cardDetails={item}/>
                        </Grid>
                    ))}
                </Grid>

            </InfiniteScroll>
        </Container>
    );
}

export default memo(Dashboard);