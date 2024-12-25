import CheckIcon from '@mui/icons-material/Check';
import { useSelector } from 'react-redux';
function Trackingbar() {

  const steps = ['กรอกรายละเอียดผู้ร้องขอ', 'กรอกหลักฐานการร้องขอ / รายละเอียดชนิดรถ','เสร็จสิ้น'];
  const trackingStep = useSelector((state:any) => state.trackingStateReducer.trackingState.trackingCount);


  return (
        <div className="space-y-6 rounded-lg  bg-white p-8 shadow-lg dark:border-gray-700 dark:bg-gray-800">

          <ol className="relative ms-3 border-s border-gray-200 dark:border-gray-700">

            {steps.map((step, index) => (
                 <li className="mb-16 ms-14">
                 <span className={`absolute -start-6 flex h-12 w-12 items-center justify-center rounded-full ${trackingStep > (index+1)  ? 'bg-green-300 ring-2 ring-green-300 dark:bg-gray-700 dark:ring-gray-800' : (trackingStep == (index + 1) ? 'bg-blue-500 ring-2 ring-blue-500 dark:bg-gray-700 dark:ring-gray-800' : 'bg-white ring-2 ring-sky-950 dark:bg-gray-700 dark:ring-gray-800') }`}>
                   <p className={`text-3xl ${trackingStep > (index + 1) ? 'text-white' : (trackingStep == (index + 1) ? 'text-white' : 'text-sky-950')}`}>
                      { trackingStep > (index + 1) ? <CheckIcon />  : (index + 1)}
                    </p>
                 </span>
                 <h4 className="mb-0.5  text-base font-semibold text-gray-900 dark:text-white">{step}</h4>
                 <p className={`text-sm font-normal ${trackingStep > (index + 1) ? 'text-green-600' : 'text-orange-600'} dark:text-gray-400`}>{trackingStep > (index + 1) ? '(เสร็จสิ้น)' : (trackingStep < (index + 1) ? '' : '(กําลังดําเนินการ)')}</p>
               </li>
            ))}

          </ol>
        </div>
    
 
  )
}

export default Trackingbar