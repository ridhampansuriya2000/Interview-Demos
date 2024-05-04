import React, { useRef, useState, useEffect } from 'react';
import styles from './Dashboard.module.css';
import Clock from "../Views/Clock";
import useOutsideClick from "../../hooks/useOutsideClick";
import useParentSize from "../../hooks/useParentSize";
import Draggable from "../Draggable";
import {addNewItem} from "../../utils/commonFunctions";
import Navbar from "../TopBar";
import AppsBar from "../AppsBar";
import NotificationBar from "../NotificationBar";

function Dashboard() {
    const divRef = useRef(null);
    const parentSize = useParentSize(divRef);

    const contextMenuRef = useRef(null);
    const subContextMenuRef = useRef(null);
    const popupRef = useRef(null);
    const [popupVisible, setPopupVisible] = useState(false);
    const [popupType, setPopupType] = useState('');
    const [dashboardItems, setDashboardItems] = useState([
        { id: 1, name:'dummy', type: '', top: 10, left: 10, width: 50, height: 70 },
        { id: 2, name:'file.docx', type: 'docx', top: 100, left: 10, width: 50, height: 70 },
        { id: 3, name:'file.docx', type: 'docx', top: 190, left: 10, width: 50, height: 70 },
        { id: 4, name:'file.docx', type: 'docx', top: 280, left: 10, width: 50, height: 70 },
        { id: 5, name:'file.docx', type: 'docx', top: 370, left: 10, width: 50, height: 70 },
    ]);

    const [popupName, setPopupName] = useState('');
    const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });

    const closeContextMenu = (ref) =>{
        const subContextMenu = ref.current;
        subContextMenu.style.display = 'none';
    };
    useEffect(() => {
        function handleClickOutside(event) {
        }
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    useOutsideClick(subContextMenuRef,()=>closeContextMenu(subContextMenuRef));
    useOutsideClick(contextMenuRef,()=>closeContextMenu(contextMenuRef));
    useOutsideClick(popupRef,handlePopupCancel);

    function showContextMenu(e,ref,openRef) {
        e.preventDefault();
        if(!openRef){
            closeContextMenu(subContextMenuRef)
        }
        if(['draggable','contextDisable']?.some((item => item === e.target.getAttribute('item') ))) return;
        // const contextMenu = contextMenuRef.current;
        const contextMenu = ref.current;
        contextMenu.style.left = `0px`;
        contextMenu.style.top = `0px`;
        contextMenu.style.display = 'block';
        contextMenu.style.visibility = 'hidden';
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        const menuWidth = contextMenu.offsetWidth;
        const menuHeight = contextMenu.offsetHeight;
        let left = e.clientX;
        let top = e.clientY;

        // Adjust position if context menu exceeds screen dimensions
        if (left + menuWidth > screenWidth) {
            left -= menuWidth;
        }
        if (top + menuHeight > screenHeight) {
            top -= menuHeight;
        }

        contextMenu.style.display = 'block';
        if(openRef){
            let {
                x,
                y,
                width,
                height,
                top,
                right,
                bottom,
                left,
            } = e.target?.getBoundingClientRect()
            if(screenWidth - right > menuWidth){
                contextMenu.style.left = `${left+menuWidth}px`;
            }else contextMenu.style.left = `${left-menuWidth}px`;


            if(screenHeight - top > menuHeight){
                contextMenu.style.top = `${top}px`;
            }else {
                contextMenu.style.top = `${bottom-menuHeight}px`;
            }
        }else{
            contextMenu.style.left = `${left}px`;
            contextMenu.style.top = `${top}px`;
        }
        contextMenu.style.visibility = 'visible';
    }


    function handleAddFolder(e) {
        setPopupType('');
        setPopupVisible(true);
        setPopupPosition({
            x: (window.innerWidth - 250) / 2,
            y: (window.innerHeight - 100) / 2
        });
        closeContextMenu(contextMenuRef);
    }

    function handleAddFile(e, fileType) {
        setPopupType(fileType);
        setPopupVisible(true);
        setPopupPosition({
            x: (window.innerWidth - 250) / 2,
            y: (window.innerHeight - 100) / 2
        });
        closeContextMenu(contextMenuRef);
        closeContextMenu(subContextMenuRef);
    }


    function handlePopupConfirm() {
        if (popupName.trim() !== '') {
            const newItem = { type: popupType, name: popupName+`${popupType ? '.'+popupType : ''}`, id: Date.now(), height:70,width:50 };

            setDashboardItems([...addNewItem(dashboardItems, newItem, parentSize?.width, parentSize?.height)]);
        }
        setPopupVisible(false);
        setPopupName('');
    }

    function handlePopupCancel() {
        setPopupVisible(false);
        setPopupName('');
    }

    return (
        <div
            className={styles.dashboardContainer}
            onContextMenu={(e) => showContextMenu(e,contextMenuRef)}
        >
            <div className={styles.topbarBox} item='draggable'>
                <Navbar />
            </div>
            <div className={styles.appsbarBox}>
                <AppsBar />
            </div>
            <div className={styles.clockBox}>
                <Clock/>
            </div>
            <div className={styles.draggableBox} id={''} >
                <Draggable
                    draggableElements={dashboardItems}
                    boundaryWidth={parentSize?.width}
                    boundaryHeight={parentSize?.height}
                    divRef={divRef}
                    setDashboardItems={setDashboardItems}
                />
            </div>

            <NotificationBar />

            {popupVisible && (
                <div
                    ref={popupRef}
                    className={styles.popup}
                    style={{ left: popupPosition.x, top: popupPosition.y }}
                    item='draggable'
                >
                    <input
                        type="text"
                        placeholder="Enter file name"
                        value={popupName}
                        onChange={(e) => setPopupName(e.target.value)}
                        item='draggable'
                    />
                    <button onClick={handlePopupConfirm} item='draggable'>Confirm</button>
                    {/*<button onClick={handlePopupCancel}>Cancel</button>*/}
                </div>
            )}
            <div className={styles.contextMenu} ref={contextMenuRef}>
                <ul>
                    <li onClick={handleAddFolder}>Add Folder</li>
                    <li
                        onClick={(e)=>showContextMenu(e,subContextMenuRef,contextMenuRef)}
                    // onClick={disableClick}
                        >
                        <span>Add File</span>
                        <span> > </span>
                    </li>
                    <li >Other option 1</li>
                    <li >Other option 2</li>
                    <li >Other option 3</li>
                    <li >Other option 4</li>
                    <li >Other option 5</li>
                </ul>
            </div>
            <div className={styles.contextMenu} ref={subContextMenuRef}>
                <ul>
                    <li onClick={(e) => handleAddFile(e, 'docx')}>Word</li>
                    <li onClick={(e) => handleAddFile(e, 'xlsx')}>Excel</li>
                    <li onClick={(e) => handleAddFile(e, 'pptx')}>PowerPoint</li>
                </ul>
            </div>
        </div>
    );
}

export default Dashboard;
