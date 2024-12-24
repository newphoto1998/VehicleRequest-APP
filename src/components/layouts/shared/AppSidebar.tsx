import { useEffect, useState } from "react";
import {
  Avatar,
  Badge,
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  Typography,
} from "@mui/material";
import {
  Menu,
  MenuItem,
  Sidebar,
  SubMenu,
  useProSidebar,
} from "react-pro-sidebar";

// import { useNavigate } from "react-router-dom";

import LocationOnIcon from '@mui/icons-material/LocationOn';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import DescriptionIcon from '@mui/icons-material/Description';

function AppSidebar() {
  const { collapsed, toggleSidebar } = useProSidebar();

  //  const position:string = "GM"
  //  const empcode:string = "13257"
  //13257
  //14766

  //   const navigate = useNavigate();
  const [activeMenuItem, setActiveMenuItem] = useState("");
  const [collapsedMenu, setcollapsedMenu] = useState<boolean>(true);
  //   const [depts,setdept] = useState<string>(dept)
  //   const [sects,setsect] = useState<string>(sect)
  //   const [groups,setgroup] = useState<string>(group)

  const [dept, setdept] = useState<string>("");
  const [sect, setsect] = useState<string>("");
  const [group, setgroup] = useState<string>("");
  const [postitonStatus, setpositionStatus] = useState<string>("");
  //   const [position_number,setposition_number] = useState<string>("")
  const PostionSupervisor: string[] = ["SE", "SS", "ST", "SU"];
  const PostionManeger: string[] = ["MG", "AM", "AMG"];
  const PositionGM: string[] = ["GM", "SGM", "AG", "AGM", "PD", "DI"];

  useEffect(() => {
    setActiveMenuItem(window.location.pathname);

    //navigate("/backend/dashboard");
  }, []);

  const handleMenuClick = (menu: string) => {
    setActiveMenuItem(menu);
    toggleSidebar();
  };

  return (
    // <Sidebar

    //         style ={{ height:"auto"
    //          , top: 'auto' }}
    //         breakPoint="md"
    //         backgroundColor={'#494C4F'}

    //     >
    //         <Box sx={styles.avatarContainer}>
    //             <Avatar sx={styles.avatar} alt="Masoud" src="http://dcidmc.dci.daikin.co.jp/PICTURE/41210.JPG" />
    //             {!collapsed ?  <Typography  variant="body2" sx={styles.yourChannel}>phatcharaphon</Typography> : null}
    //             {!collapsed ?  <Typography variant="body2" sx={{color:'black'}}>IT</Typography>: null}
    //             {!collapsed ?  <Typography variant="body2" sx={{color:'black'}}>ตำแหน่ง : EN</Typography>: null}

    //         </Box>
    //         <Menu
    //             menuItemStyles={{
    //                 button: ({active}) =>{
    //                     return {
    //                         background: active ? '#18181B' : '#18181B',
    //                         color:active? 'white' :'#18181B'
    //                     }
    //                 }
    //             }}>

    //                 <>
    //                  <MenuItem active={activeMenuItem === "/request-form-1" } component={<Link to="/request-form-1" />} onClick={()=>handleMenuClick("/request-form-1")} icon={<DashboardOutlinedIcon />}> <Typography variant="body1">Dashboard</Typography></MenuItem>

    //                 </>

    //         </Menu >
    //     </Sidebar >

    <div className="flex h:auto">
      <Sidebar
        style={{ color: "white" }}
        breakPoint="md"
        backgroundColor={"#494C4F"}
      >

      <div className="flex flex-col items-center h-full w-full  pt-6 gap-2">
      <div className="flex flex-col items-center justify-center w-full mt-4 gap-4">
        <div className="w-full flex justify-center items-center">
          <img
            className="h-28 w-28  rounded-full"
            src="http://dcidmc.dci.daikin.co.jp/PICTURE/41210.jpg"
            alt=""
          />
        </div>
        <div className="text-xl text-center w-full">
          <p className="text-white">
            Role: Engineer
          </p>
        </div>
        <div className="text-sm text-center w-full">
          <p className="text-gray-400">System Devlopment</p>
        </div>
      </div>
      <div className="flex flex-col items-center h-full w-full  pt-6 gap-2">
        <div className="flex items-center w-full px-10  hover:bg-[#18181B]">
          <div>
            <DescriptionIcon className="text-white text-2xl" />
          </div>
          <div>
            <button type="button" className="p-4 w-full">
              ออกเอกสาร
            </button>
          </div>
        </div>

        <div className="w-full flex flex-row items-center px-10 hover:bg-[#18181B]">
          <div>
            <LocationOnIcon
             
              className="text-white text-2xl"
            />
          </div>
          <div >
            <button type="button" className="p-4 w-full">
              สถานะเอกสาร
            </button>

          </div>
        </div>
      </div>
      </div>
      </Sidebar>
    </div>
  );
}


export default AppSidebar;
