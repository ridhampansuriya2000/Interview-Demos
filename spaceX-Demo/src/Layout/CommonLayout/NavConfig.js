// component
import Iconify from 'components/Iconify';

/*---------------------------Icons-------------------------------*/
import DashboardIcon from "../../components/Icon/SideBar/DashboardIcon";
import ChatIcon from "../../components/Icon/SideBar/ChatIcon";
import {lazy} from "react";

// ----------------------------------------------------------------------
const Dashboard = lazy(() => import("screen/Pages/Components/Dashboard"));
const ChatWithUs = lazy(() => import("screen/Pages/ChatWithUs"));

const navConfig = [
  {
    title: "Dashboard",
    path: '/',
    icon: <DashboardIcon/>,
    component: <Dashboard />,
  },
  {
    title: "Dashboard 2",
    path: '/dashboard2',
    icon: <DashboardIcon/>,
    component: <Dashboard />,
  },
  {
    title: "Dashboard 3",
    path: '/dashboard3',
    icon: <DashboardIcon/>,
    component: <Dashboard />,
  },
  {
    title: "Dashboard 4",
    path: '/dashboard4',
    icon: <DashboardIcon/>,
    component: <Dashboard />,
  },
  {
    title: "Dashboard 5",
    path: '/dashboard5',
    icon: <DashboardIcon/>,
    component: <Dashboard />,
  },
  {
    title: "Dashboard 6",
    path: '/dashboard6',
    icon: <DashboardIcon/>,
    component: <Dashboard />,
  },
  {
    // title: 'Chat with us',
    title: "Chat_With_Us",
    path: '/chat-with-us',
    icon: <ChatIcon/>,
    component: <ChatWithUs />,
  },
];

export default navConfig;
