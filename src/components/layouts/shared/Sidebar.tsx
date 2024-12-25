import DashboardIcon from '@mui/icons-material/Dashboard';
import DescriptionIcon from '@mui/icons-material/Description';

function Sidebar() {
  return (
    <div className="w-60 h-[900px] fixed text-white flex flex-col ml-[-20px] top-24 bg-[#394247] rounded-3xl space-y-6 hidden md:block">
      <div className="flex flex-col items-center justify-center w-full mt-4 gap-4">
        <div className="w-full flex justify-center items-center">
          <img
            className="h-28 w-28 object-cover rounded-full"
            src="http://dcidmc.dci.daikin.co.jp/PICTURE/41210.jpg"
            alt=""
          />
        </div>

        <div className="text-xl text-center w-full">
          
          <p className="text-white hidden md:block">
            Role: Engineer
          </p>
        </div>

        <div className="text-sm text-center w-full">
          <p className="text-gray-400">System Devlopment</p>
        </div>
      </div>

      <div className="flex flex-col items-center h-full w-full  pt-6 gap-2">
        <div className="flex items-center justify-around w-full px-14  hover:bg-[#18181B]">
          <div>
            <DashboardIcon className="text-white text-2xl" />
          </div>
          <div>
            <button type="button" className="p-4 w-full pr-10">
              Dashboard
            </button>
          </div>
        </div>

        <div className="w-full flex flex-row items-center justify-stretch px-14 hover:bg-[#18181B]">
          <div>
            <DescriptionIcon
              style={{ fontSize: 30 }}
              className="text-white text-2xl"
            />
          </div>
          <div>
            <button type="button" className="p-4 w-full">
              Request
            </button>
          </div>
        </div>
      </div>


    </div>
  );
}

export default Sidebar;
