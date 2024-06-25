import React from "react";

const Bankdetail = ({bankname, accountnumber, username , onClick}) => {
  return (
    <div className="">
      {/* start */}
      {/* container */}
      {/* sm:w-1/2 xl:w-3/5 */}
      
      <div>
        <div className="relative min-h-screen  grid bg-black ">
          <div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-auto min-w-0 ">
            <div
              className="  bg-blue-500 h-full hidden md:flex flex-auto items-center justify-center  overflow-hidden  text-white bg-no-repeat bg-cover relative"
              // style={{backgroundImage: "url(https://foreignpolicy.com/wp-content/themes/foreign-policy-2017/assets/src/images/power-maps/future-of-money-part-2/Main-static.jpg)" }}
            >
              <img className="h-full w-full" src="https://foreignpolicy.com/wp-content/themes/foreign-policy-2017/assets/src/images/power-maps/future-of-money-part-2/Main-static.jpg" alt="" />
              {/* <div className="absolute bg-black  opacity-25 inset-0 z-0"></div>
              <div className="w-full  lg:max-w-2xl md:max-w-md z-10 items-center text-center ">
                <div className=" font-bold leading-tight mb-6 mx-auto w-full content-center items-center "></div>
              </div> */}
            </div>

            <div className="md:flex md:items-center md:justify-left w-full sm:w-auto md:h-full xl:w-1/2 p-8  md:p-10 lg:p-14 sm:rounded-lg md:rounded-none ">
              <div className="max-w-xl w-full space-y-12">
                <div className="lg:text-left text-center">
                  <div className="flex items-center justify-center ">
                    <div className="bg-black flex flex-col w-80 border border-gray-900 rounded-lg px-8 py-10">
                      <form className="flex flex-col space-y-4 mt-10">

                      <div>
                        <label className="font-bold text-lg text-white ">
                        Account Name: 
                        </label>
                        <p className="text-white">{username ? username : "N/A"}</p>
                        </div>


                        <div>
                        <label className="font-bold text-lg text-white ">
                          Account Number:
                        </label>
                        <p className="text-white">{accountnumber  ? accountnumber : "N/A"}</p>
                        </div>

                        <div>
                        <label className="font-bold text-lg text-white ">
                          Bank Name:
                        </label>
                        <p className="text-white">{bankname  ? bankname : "N/A"}</p>
                        </div>


                        <button
                        type="button"
                          className="border border-indigo-600 bg-black text-white rounded-lg py-3 font-semibold"
                         onClick={onClick}
                        >
                          Edit Account
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* end */}
    </div>
  );
};

export default Bankdetail;
