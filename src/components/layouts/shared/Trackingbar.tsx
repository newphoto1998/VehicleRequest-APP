import React from 'react'

function Trackingbar() {
  return (

        <div className="space-y-6 rounded-lg bg-white p-6  dark:border-gray-700 dark:bg-gray-800">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Order history</h3>

          <ol className="relative ms-3 border-s border-gray-200 dark:border-gray-700">
            <li className="mb-10 ms-6">
              <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white dark:bg-gray-700 dark:ring-gray-800">
                <svg className="h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5"/>
                </svg>
              </span>
              <h4 className="mb-0.5 text-base font-semibold text-gray-900 dark:text-white">กรอกรายละเอียดผู้ร้องขอ</h4>
              <p className="text-sm font-normal text-gray-500 dark:text-gray-400">Products delivered</p>
            </li>

            <li className="mb-10 ms-6">
              <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white dark:bg-gray-700 dark:ring-gray-800">
                <svg className="h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"/>
                </svg>
              </span>
              <h4 className="mb-0.5 text-base font-semibold text-gray-900 dark:text-white">กรอกหลักฐานการร้องขอ / รายละเอียดชนิดรถ</h4>
              <p className="text-sm font-normal text-gray-500 dark:text-gray-400">Products being delivered</p>
            </li>

            <li className="mb-10 ms-6 text-primary-700 dark:text-primary-500">
              <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary-100 ring-8 ring-white dark:bg-primary-900 dark:ring-gray-800">
                <svg className="h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 11.917 9.724 16.5 19 7.5" />
                </svg>
              </span>
              <h4 className="mb-0.5 font-semibold">ตรวจสอบข้อมูล</h4>
              <p className="text-sm">Products in the courier's warehouse</p>
            </li>

            <li className="mb-10 ms-6 text-primary-700 dark:text-primary-500">
              <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary-100 ring-8 ring-white dark:bg-primary-900 dark:ring-gray-800">
                <svg className="h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 11.917 9.724 16.5 19 7.5" />
                </svg>
              </span>
              <h4 className="mb-0.5 text-base font-semibold">เสร็จสิ้น</h4>
              <p className="text-sm">Products delivered to the courier - DHL Express</p>
            </li>

       
          </ol>
        </div>
 
  )
}

export default Trackingbar