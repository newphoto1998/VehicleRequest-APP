// @ts-ignore
import  { useState } from "react";
// @ts-ignore
import {  Box, IconButton,Menu,MenuItem, } from '@mui/material'
import MenuIcon from "@mui/icons-material/Menu";
// @ts-ignore
import { Link, useNavigate } from "react-router-dom";
import {  useProSidebar } from "react-pro-sidebar";

import Divider, { dividerClasses } from '@mui/material/Divider';
import classNames from 'classnames';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

function AppNavbar() {
  // @ts-ignore
    const navigate = useNavigate();
    const { collapseSidebar, toggleSidebar, broken } = useProSidebar();
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    }

  
    // const [anchorEl, setAnchorEl] = useState(null);
  
    // const handleMenuOpen = (event: any) => {
    //   setAnchorEl(event.currentTarget);
    // };
  
  
    const handleLogout = () => {
 
        localStorage.clear();
        window.location.href = "http://dciapp.dci.daikin.co.jp/userreviewapp/";
        //navigate("userreviewapp/");
    };

    // const handleClose = () => {
    //   setAnchorEl(null);
    // };


  return (
    <>
    <div className="flex flex-row justify-between border border-gray-100">
            <div className={classNames(dividerClasses.root, 'mx-0.5 flex')}><IconButton onClick={() => (broken ? toggleSidebar() : collapseSidebar())}><MenuIcon/></IconButton>  <Divider orientation="vertical"  /></div>
            <div className={classNames(dividerClasses.root, 'mx-0.5 flex')}> 
                <div><button></button></div>
                <div className="flex justify-center items-center gap-2  cursor-pointer hover:bg-gray-200" onClick={toggleDropdown}>
                    <Divider orientation="vertical"  />
                    <div className="w-full "><img className="h-8 w-8 rounded-full" src="http://dcidmc.dci.daikin.co.jp/PICTURE/41210.jpg"/> </div>
                    <div className="text-sm text-start w-full "><p className="text-black">Phatcharaphon.f</p></div>
                    <div><KeyboardArrowDownIcon/></div>
                </div>

                {isOpen && (
                             <div id="dropdownNavbar" className="z-10 mt-11 ml-8 absolute font-normal bg-white divide-y divide-gray-100 rounded-lg shadow-xl w-44 dark:bg-gray-700 dark:divide-gray-600 border border-gray-200">
                                <div className="py-1 ">
                                <h1  className="block px-4 py-2 text-sm text-black font-bold ">My Account</h1>
                                </div>
                             <ul className="py-2 text-sm text-gray-700 dark:text-gray-400" aria-labelledby="dropdownLargeButton">
                             
                                
                                <li>
                                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Profile</a>
                                </li>
                                
                            </ul>
                                <div className="py-1">
                                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
                                </div>
                         </div>
                    )}
                </div>

    </div>
    </>
   
  )
}


export default AppNavbar