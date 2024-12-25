import { useEffect, useState } from "react";

import {
  Menu,
  MenuItem,
  Sidebar,
  useProSidebar,
} from "react-pro-sidebar";

// import { useNavigate } from "react-router-dom";

import LocationOnIcon from "@mui/icons-material/LocationOn";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import DescriptionIcon from "@mui/icons-material/Description";
import { Link } from "react-router-dom";

function AppSidebar() {
  const { collapsed, toggleSidebar } = useProSidebar();


  const [activeMenuItem, setActiveMenuItem] = useState("");
  const [collapsedMenu, setcollapsedMenu] = useState<boolean>(true);


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
                className={`${collapsed ? "w-12 h-12" : "w-28 h-28"}   rounded-full`}
                src="http://dcidmc.dci.daikin.co.jp/PICTURE/41210.jpg"
                alt=""
              />
            </div>
              {!collapsed ?  (<>

                <div className="text-center w-full">
                  <p className="text-xl text-white">Role: Engineer</p>
                  <p className="text-sm text-gray-400 mt-1">System Devlopment</p>

                </div>
            
              
              </>):null}
               
             
      
          </div>
          
          <Menu
            menuItemStyles={{
              button: ({ active }) => {
                return {
                  background: active ? "#18181B" : "transparent",
                  color: active ? "white" : "",
                  "&:hover": {
                    backgroundColor: "#18181B",
                  },
                  marginTop: "10px",
                  paddingLeft: "30px",
                  paddingRight: "30px",

                };
              },
            }}
          >
                
                <Link to={"/request-form-1"}>
                  <MenuItem
                    active={
                      activeMenuItem === "/request-form-1"
                    }
                    onClick={() =>
                      handleMenuClick("/request-form-1")
                    }
                    icon={<DescriptionIcon className="text-white text-2xl"/>}
                  >
                    {!collapsed ? "  ร้องขอเอกสาร" : ""}
                  </MenuItem>
                </Link>
                      
              <Link to={"/userreviewapp/backend/UserReviewMonitor"}>
                <MenuItem
                  active={
                    activeMenuItem ===
                    "/userreviewapp/backend/UserReviewMonitor"
                  }
                  onClick={() =>
                    handleMenuClick("/userreviewapp/backend/UserReviewMonitor")
                  }
                  icon={ <LocationOnIcon className="text-white text-2xl " />}
                >
                    {!collapsed ? "  ติดตามสถานะ" : ""}
                
                </MenuItem>
              </Link>
          
          </Menu>

        </div>
      </Sidebar>
    </div>
  );
}

export default AppSidebar;
