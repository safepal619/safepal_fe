import React, { useState } from "react";
import { getAllUsers, getNotifications, getTransactions, verifyNotificationsmutation } from "../services/request";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import Cart from "./Cart";
import { logout } from "../services/userSlice";
import { useQueryClient } from '@tanstack/react-query'

const Dashbroad = () => {
  const { user } = useSelector((state) => state.user);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
//   const [dropdownOpen, setDropdownOpen] = useState(false);

  const [selected, setSelected] = useState("Users");

  const navigate = useNavigate();
  const dispatch = useDispatch()

  const queryClient = useQueryClient()

  const { data } = getAllUsers({ token: user.token });
  const { data: transactions } = getTransactions();
 const {data: notifications} = getNotifications()
  const notifyMutation = verifyNotificationsmutation()


  if(notifyMutation.isSuccess){
    (async () => {
       await queryClient.invalidateQueries({ queryKey: ['notifications'] })
    })()

  } 

  const [open, setOpen] = useState(false);
  const [txn, setTxn] = useState({});

  const status = transactions?.data.reduce(
    (accumulator, item) => {
      if (item.status == "Success") {

        // console.log(item)
        if (item?.isDeposit) {
          accumulator.deposit += item.amount;
        } else {
          accumulator.withdraw += item.amount;
        }
      }
      return accumulator;
    },
    { deposit: 0, withdraw: 0 }
  );


  // console.log(status)

  const notify = notifications?.data?.reduce((accumulator, item) => {
      if (item.status == "Pending") {
        ++accumulator
      }
      return accumulator;
    }, 0);


    const handleLogout = () => {
        dispatch(logout()) 
    }



    if(!data || !transactions || !notifications){ 
    
    return <div className="flex min-h-screen items-center justify-center flex-1">
    <div className="w-1/3">
        <div className="max-w-sm rounded overflow-hidden shadow-lg animate-pulse">
        <div className="h-48 bg-gray-300"></div>
        <div className="px-6 py-4">
            <div className="h-6 bg-gray-300 mb-2"></div>
            <div className="h-4 bg-gray-300 w-2/3"></div>
        </div>
        <div className="px-6 pt-4 pb-2">
            <div className="h-4 bg-gray-300 w-1/4 mb-2"></div>
            <div className="h-4 bg-gray-300 w-1/2"></div>
        </div>
        </div>
    </div>
</div>}





  return (
    <div className=" w-full">
      {open && <Cart open={open} setOpen={setOpen} txn={txn} />}

      <div className="flex h-screen bg-gray-200">
        <div
          onClick={() => setSidebarOpen(false)}
          className={`fixed inset-0 z-20 transition-opacity bg-black opacity-50 lg:hidden ${
            sidebarOpen ? "block" : "hidden"
          }`}
        ></div>

        <div
          className={`fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transition duration-300 transform bg-gray-900 lg:translate-x-0 lg:static lg:inset-0 ${
            sidebarOpen ? "translate-x-0 ease-out" : "-translate-x-full ease-in"
          }`}
        >
          <div className="flex items-center justify-center mt-8">
            <div className="flex items-center cursor-pointer">
              <svg
                className="w-12 h-12"
                viewBox="0 0 512 512"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M364.61 390.213C304.625 450.196 207.37 450.196 147.386 390.213C117.394 360.22 102.398 320.911 102.398 281.6C102.398 242.291 117.394 202.981 147.386 172.989C147.386 230.4 153.6 281.6 230.4 307.2C230.4 256 256 102.4 294.4 76.7999C320 128 334.618 142.997 364.608 172.989C394.601 202.981 409.597 242.291 409.597 281.6C409.597 320.911 394.601 360.22 364.61 390.213Z"
                  fill="#4C51BF"
                  stroke="#4C51BF"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M201.694 387.105C231.686 417.098 280.312 417.098 310.305 387.105C325.301 372.109 332.8 352.456 332.8 332.8C332.8 313.144 325.301 293.491 310.305 278.495C295.309 263.498 288 256 275.2 230.4C256 243.2 243.201 320 243.201 345.6C201.694 345.6 179.2 332.8 179.2 332.8C179.2 352.456 186.698 372.109 201.694 387.105Z"
                  fill="white"
                ></path>
              </svg>

              <span className="mx-2 text-2xl font-semibold text-white">
                Dashboard
              </span>
            </div>
          </div>

          <nav className="mt-10">
            <div className="flex items-center px-6 py-2 mt-4 text-gray-100 bg-gray-700 bg-opacity-25 cursor-pointer">
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
                ></path>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
                ></path>
              </svg>

              <span className="mx-3">Dashboard</span>
            </div>

            <div onClick={handleLogout} className="flex items-center px-6 py-2 mt-4 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100 cursor-pointer">
                        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z">
                            </path>
                        </svg>
        
                        <span className="mx-3">Logout</span>
                    </div>

            {/* <a className="flex items-center px-6 py-2 mt-4 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100"
                        href="#">
                        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10">
                            </path>
                        </svg>
        
                        <span className="mx-3">Tables</span>
                    </a> */}

            {/* <a className="flex items-center px-6 py-2 mt-4 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100"
                        href="#">
                        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z">
                            </path>
                        </svg>
        
                        <span className="mx-3">Forms</span>
                    </a> */}
          </nav>
        </div>

        <div className="flex flex-col flex-1 overflow-hidden">
          <header className="flex items-center justify-between px-6 py-4 bg-white border-b-4 border-indigo-600">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="text-gray-500 focus:outline-none lg:hidden"
              >
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 6H20M4 12H20M4 18H11"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </button>

              <div className="flex bg-gray-50 items-center p-2 rounded-md">
                {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg> */}
                {/* <input
                  className="bg-gray-50 outline-none ml-1 block "
                  type="text"
                  name=""
                  id=""
                  placeholder="search..."
                /> */}
              </div>
            </div>

            <div className="flex items-center">
              <div xxx-data="{ notificationOpen: false }" className="relative">
                <button
                  onClick={() => {
                    notifyMutation.mutate()
                    setNotificationOpen((notification) => !notification)
                }
                  }
                  className=" mx-4 text-gray-600 focus:outline-none relative"
                >
                    {notify > 0 && <h1 className="absolute -top-3 left-2 bg-green-700 rounded-full text-white">{notify}</h1>}
                  <svg
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15 17H20L18.5951 15.5951C18.2141 15.2141 18 14.6973 18 14.1585V11C18 8.38757 16.3304 6.16509 14 5.34142V5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5V5.34142C7.66962 6.16509 6 8.38757 6 11V14.1585C6 14.6973 5.78595 15.2141 5.40493 15.5951L4 17H9M15 17V18C15 19.6569 13.6569 21 12 21C10.3431 21 9 19.6569 9 18V17M15 17H9"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </button>

                {notificationOpen && (
                  <div
                    xxx-show="dropdownOpen"
                    onClick={() => setNotificationOpen(false)}
                    className="fixed inset-0 z-10 w-full h-full"
                    style={{ display: "block" }}
                  ></div>
                )}

                {notificationOpen && (
                  <div
                    className="absolute right-0 z-50 mt-2 overflow-scroll max-h-screen bg-white rounded-lg shadow-xl w-80 border"
                    style={{ width: "20rem", display: "block" }}
                  >


                   {notifications && notifications?.data.map(notice => (
                    <div
                    key={notice?._id}
                      className="flex items-center px-4 py-3 -mx-2 text-gray-600 hover:text-white hover:bg-indigo-600"
                    >
                      <img
                        className="object-cover w-8 h-8 mx-1 rounded-full"
                        src={notice?.user?.avatar}
                        alt="avatar"
                      />
                      <p className="mx-2 text-sm">
                        <span className="font-bold" href="#">
                          {notice?.user?.username}
                        </span>{" "}
                        {notice.message}
                        . {moment(notice?.createdAt).fromNow()}
                      </p>
                    </div>

                   ))}


                  </div>
                )}
              </div>

              {/* <div xx-data="{ dropdownOpen: false }" className="relative">
                         <button
                            onClick={() => setDropdownOpen(dropdown => !dropdown)}
                                className="relative block w-8 h-8 overflow-hidden rounded-full shadow focus:outline-none">
                                <img className="object-cover w-full h-full"
                                    src="https://images.unsplash.com/photo-1528892952291-009c663ce843?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=296&amp;q=80"
                                    alt="Your avatar" />
                            </button>
        
                            {dropdownOpen && <div xxx-show="dropdownOpen" onClick={() => setDropdownOpen(false)} className="fixed inset-0 z-10 w-full h-full"
                                style={{display: "block"}}></div>}
        
                           {dropdownOpen && <div xxx-show="dropdownOpen"
                                className="absolute right-0 z-10 w-48 mt-2 overflow-hidden bg-white rounded-md shadow-xl"
                                style={{display: "block"}}>
                                <a href="#"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white">Profile</a>
                                <a href="#"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white">Products</a>
                                <a href="#"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white">Logout</a>
                            </div>}

                        </div> */}
            </div>
          </header>
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
            <div className="container px-6 py-8 mx-auto">
              <h3 className="text-3xl font-medium text-gray-700">Dashboard</h3>

              <div className="mt-4">
                <div className="flex flex-wrap -mx-6">
                  <div className="w-full px-6 sm:w-1/2 xl:w-1/3">
                    <div
                      className="flex items-center px-5 py-6 bg-white rounded-md shadow-sm cursor-pointer"
                      onClick={() => setSelected("Users")}
                    >
                      <div className="p-3 bg-indigo-600 bg-opacity-75 rounded-full">
                        <svg
                          className="w-8 h-8 text-white"
                          viewBox="0 0 28 30"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M18.2 9.08889C18.2 11.5373 16.3196 13.5222 14 13.5222C11.6804 13.5222 9.79999 11.5373 9.79999 9.08889C9.79999 6.64043 11.6804 4.65556 14 4.65556C16.3196 4.65556 18.2 6.64043 18.2 9.08889Z"
                            fill="currentColor"
                          ></path>
                          <path
                            d="M25.2 12.0444C25.2 13.6768 23.9464 15 22.4 15C20.8536 15 19.6 13.6768 19.6 12.0444C19.6 10.4121 20.8536 9.08889 22.4 9.08889C23.9464 9.08889 25.2 10.4121 25.2 12.0444Z"
                            fill="currentColor"
                          ></path>
                          <path
                            d="M19.6 22.3889C19.6 19.1243 17.0927 16.4778 14 16.4778C10.9072 16.4778 8.39999 19.1243 8.39999 22.3889V26.8222H19.6V22.3889Z"
                            fill="currentColor"
                          ></path>
                          <path
                            d="M8.39999 12.0444C8.39999 13.6768 7.14639 15 5.59999 15C4.05359 15 2.79999 13.6768 2.79999 12.0444C2.79999 10.4121 4.05359 9.08889 5.59999 9.08889C7.14639 9.08889 8.39999 10.4121 8.39999 12.0444Z"
                            fill="currentColor"
                          ></path>
                          <path
                            d="M22.4 26.8222V22.3889C22.4 20.8312 22.0195 19.3671 21.351 18.0949C21.6863 18.0039 22.0378 17.9556 22.4 17.9556C24.7197 17.9556 26.6 19.9404 26.6 22.3889V26.8222H22.4Z"
                            fill="currentColor"
                          ></path>
                          <path
                            d="M6.64896 18.0949C5.98058 19.3671 5.59999 20.8312 5.59999 22.3889V26.8222H1.39999V22.3889C1.39999 19.9404 3.2804 17.9556 5.59999 17.9556C5.96219 17.9556 6.31367 18.0039 6.64896 18.0949Z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </div>

                      <div className="mx-5">
                        <h4 className="text-2xl font-semibold text-gray-700">
                          {data?.data?.length || 0}
                        </h4>
                        <div className="text-gray-500">All Users</div>
                      </div>
                    </div>
                  </div>

                  <div
                    className="w-full px-6 mt-6 sm:w-1/2 xl:w-1/3 sm:mt-0 cursor-pointer"
                    onClick={() => setSelected("Withdrawal")}
                  >
                    <div className="flex items-center px-5 py-6 bg-white rounded-md shadow-sm">
                      <div className="p-3 bg-orange-600 bg-opacity-75 rounded-full">
                        <svg
                          className="w-8 h-8 text-white"
                          viewBox="0 0 28 28"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M4.19999 1.4C3.4268 1.4 2.79999 2.02681 2.79999 2.8C2.79999 3.57319 3.4268 4.2 4.19999 4.2H5.9069L6.33468 5.91114C6.33917 5.93092 6.34409 5.95055 6.34941 5.97001L8.24953 13.5705L6.99992 14.8201C5.23602 16.584 6.48528 19.6 8.97981 19.6H21C21.7731 19.6 22.4 18.9732 22.4 18.2C22.4 17.4268 21.7731 16.8 21 16.8H8.97983L10.3798 15.4H19.6C20.1303 15.4 20.615 15.1004 20.8521 14.6261L25.0521 6.22609C25.2691 5.79212 25.246 5.27673 24.991 4.86398C24.7357 4.45123 24.2852 4.2 23.8 4.2H8.79308L8.35818 2.46044C8.20238 1.83722 7.64241 1.4 6.99999 1.4H4.19999Z"
                            fill="currentColor"
                          ></path>
                          <path
                            d="M22.4 23.1C22.4 24.2598 21.4598 25.2 20.3 25.2C19.1403 25.2 18.2 24.2598 18.2 23.1C18.2 21.9402 19.1403 21 20.3 21C21.4598 21 22.4 21.9402 22.4 23.1Z"
                            fill="currentColor"
                          ></path>
                          <path
                            d="M9.1 25.2C10.2598 25.2 11.2 24.2598 11.2 23.1C11.2 21.9402 10.2598 21 9.1 21C7.9402 21 7 21.9402 7 23.1C7 24.2598 7.9402 25.2 9.1 25.2Z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </div>

                      <div className="mx-5">
                        <h4 className="text-2xl font-semibold text-gray-700">
                          {status?.withdraw}
                        </h4>
                        <div className="text-gray-500">Total Withdrawal</div>
                      </div>
                    </div>
                  </div>

                  <div
                    className="w-full px-6 mt-6 sm:w-1/2 xl:w-1/3 xl:mt-0 cursor-pointer"
                    onClick={() => setSelected("Deposit")}
                  >
                    <div className="flex items-center px-5 py-6 bg-white rounded-md shadow-sm">
                      <div className="p-3 bg-pink-600 bg-opacity-75 rounded-full">
                        <svg
                          className="w-8 h-8 text-white"
                          viewBox="0 0 28 28"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6.99998 11.2H21L22.4 23.8H5.59998L6.99998 11.2Z"
                            fill="currentColor"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinejoin="round"
                          ></path>
                          <path
                            d="M9.79999 8.4C9.79999 6.08041 11.6804 4.2 14 4.2C16.3196 4.2 18.2 6.08041 18.2 8.4V12.6C18.2 14.9197 16.3196 16.8 14 16.8C11.6804 16.8 9.79999 14.9197 9.79999 12.6V8.4Z"
                            stroke="currentColor"
                            strokeWidth="2"
                          ></path>
                        </svg>
                      </div>

                      <div className="mx-5">
                        <h4 className="text-2xl font-semibold text-gray-700">
                          {status?.deposit}
                        </h4>
                        <div className="text-gray-500">Available Deposit</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8"></div>

              {selected === "Users" && (
                <div className="flex flex-col mt-8">
                  <div className="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                    <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
                      <table className="min-w-full">
                        <thead>
                          <tr>
                            <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                              Name
                            </th>
                            <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                              Phone
                            </th>
                            <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                              Status
                            </th>
                            <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                Chat
                            </th>
                            <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-right text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                Detail
                            </th>
                            {/* <th className="px-6 py-3 border-b border-gray-200 bg-gray-50">Detail</th> */}
                          </tr>
                        </thead>

                        <tbody className="bg-white">
                          {data &&
                            data?.data.map((user) => (
                              <tr key={user._id}>
                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                  <div className="flex items-center">
                                    <div className="flex-shrink-0 w-10 h-10">
                                      <img
                                        className="w-10 h-10 rounded-full"
                                        src={user?.avatar}
                                        alt=""
                                      />
                                    </div>

                                    <div className="ml-4">
                                      <div className="text-sm font-medium leading-5 text-gray-900">
                                        {user.username}
                                      </div>
                                      <div className="text-sm leading-5 text-gray-500">
                                        {user.email}
                                      </div>
                                    </div>
                                  </div>
                                </td>

                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                  <div className="text-sm leading-5 text-gray-900">
                                    {user.phone_number}
                                  </div>
                                  <div className="text-sm leading-5 text-gray-500">
                                    {user.country}
                                  </div>
                                </td>

                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                  <span
                                    className={`inline-flex px-2 text-xs font-semibold leading-5 ${
                                      user.verify_account
                                        ? "text-green-800"
                                        : "text-red-800"
                                    } bg-green-100 rounded-full `}
                                  >
                                    {user.verify_account
                                      ? "Verify"
                                      : "Not verify"}
                                  </span>
                                </td>

                                <td className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                                <button onClick={() => navigate(`/chat/${user._id}`)} type="button"  className="text-indigo-600 hover:text-indigo-900">{user?.message_counter_admin > 0 && <span className='text-white bg-green-900 rounded-full p-1'>{user?.message_counter_admin}</span>}chat</button>
                                </td>


                                <td className="px-6 py-4 text-sm font-medium leading-5 text-right whitespace-no-wrap border-b border-gray-200">
                                  <button
                                    onClick={() =>
                                      navigate("/user/" + user._id)
                                    }
                                    type="button"
                                    className="text-indigo-600 hover:text-indigo-900"
                                  >
                                    View
                                  </button>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* Deposit start */}

              {selected === "Deposit" && (
                <div className="bg-white p-8 rounded-md w-full">
                  <div>
                    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                      <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                        <table className="min-w-full leading-normal">
                          <thead>
                            <tr>
                              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Name
                              </th>
                              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                products
                              </th>
                              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Created at
                              </th>
                              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                QRT
                              </th>
                              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Status
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {transactions &&
                              transactions.data
                                .filter(
                                  (transaction) =>
                                    transaction.isDeposit === true
                                )
                                .map((deposit) => (
                                  <tr
                                    key={deposit._id}
                                    className="cursor-pointer"
                                    onClick={() => {
                                      setOpen(true);
                                      setTxn(deposit);
                                    }}
                                  >
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                      <div className="flex items-center">
                                        <div className="flex-shrink-0 w-10 h-10">
                                          <img
                                            className="w-full h-full rounded-full"
                                            src={deposit?.sender?.avatar}
                                            alt={deposit?.sender?.username}
                                          />
                                        </div>
                                        <div className="ml-3">
                                          <p className="text-gray-900 whitespace-no-wrap">
                                            {deposit?.sender?.username}
                                          </p>
                                        </div>
                                      </div>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                      <p className="text-gray-900 whitespace-no-wrap">
                                        {deposit?.walletname}
                                      </p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                      <p className="text-gray-900 whitespace-no-wrap">
                                        <span>
                                          {moment(deposit?.createdAt).format(
                                            "MMM DD, yyyy"
                                          )}
                                        </span>
                                      </p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                      <p className="text-gray-900 whitespace-no-wrap">
                                        ${deposit?.amount?.toFixed(2).toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                      </p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                      <span
                                        className={`relative inline-block px-3 py-1 font-semibold ${
                                          deposit?.isVerify
                                            ? "text-green-900"
                                            : "text-white"
                                        } leading-tight`}
                                      >
                                        <span
                                          aria-hidden
                                          className={`absolute inset-0  ${
                                            deposit?.status == "Success"
                                              ? "bg-green-200"
                                              : deposit?.status == "Pending"
                                              ? "bg-yellow-500"
                                              : "bg-red-900"
                                          } opacity-50 rounded-full`}
                                        ></span>
                                        <span className="relative text-white">
                                          {deposit?.status}
                                        </span>
                                      </span>
                                    </td>
                                  </tr>
                                ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Depositend */}
              {/* Withdrawal  start */}

              {selected === "Withdrawal" && (
                <div className="bg-white p-8 rounded-md w-full">
                  <div>
                    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                      <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                        <table className="min-w-full leading-normal">
                          <thead>
                            <tr>
                              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Name
                              </th>
                              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                products
                              </th>
                              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Created at
                              </th>
                              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                QRT
                              </th>
                              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Status
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {transactions &&
                              transactions.data
                                .filter(
                                  (transaction) =>
                                    transaction.isDeposit === false
                                )
                                .map((withdrawal) => (
                                  <tr
                                    key={withdrawal._id}
                                    onClick={() => {
                                      setOpen(true);
                                      setTxn(withdrawal);
                                    }}
                                  >
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                      <div className="flex items-center">
                                        <div className="flex-shrink-0 w-10 h-10">
                                          <img
                                            className="w-full h-full rounded-full"
                                            src={withdrawal?.sender?.avatar}
                                            alt={withdrawal?.sender?.username}
                                          />
                                        </div>
                                        <div className="ml-3">
                                          <p className="text-gray-900 whitespace-no-wrap">
                                            {withdrawal?.sender?.username}
                                          </p>
                                        </div>
                                      </div>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                      <p className="text-gray-900 whitespace-no-wrap">
                                        {withdrawal?.walletname}
                                      </p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                      <p className="text-gray-900 whitespace-no-wrap">
                                        <span>
                                          {moment(withdrawal?.createdAt).format(
                                            "MMM DD, yyyy"
                                          )}
                                        </span>
                                      </p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                      <p className="text-gray-900 whitespace-no-wrap">
                                        ${withdrawal?.amount?.toFixed(2).toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                      </p>
                                    </td>

                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                      <span
                                        className={`relative inline-block px-3 py-1 font-semibold ${
                                          withdrawal?.isVerify
                                            ? "text-green-900"
                                            : "text-white"
                                        } leading-tight`}
                                      >
                                        <span
                                          aria-hidden
                                          className={`absolute inset-0  ${
                                            withdrawal?.status == "Success"
                                              ? "bg-green-200"
                                              : withdrawal?.status == "Pending"
                                              ? "bg-yellow-500"
                                              : "bg-red-900"
                                          } opacity-50 rounded-full`}
                                        ></span>
                                        <span className="relative text-white">
                                          {withdrawal?.status}
                                        </span>
                                      </span>
                                    </td>
                                  </tr>
                                ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Withdrawal end */}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashbroad;
