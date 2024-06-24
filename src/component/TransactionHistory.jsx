import { Empty } from "antd";
import { useSelector } from "react-redux";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import moment from "moment";
import { getTransaction } from "../services/request";

const TransactionHistory = () => {

  const { user } = useSelector((state) => state.user);

  const {data} = getTransaction({token: user.token, userId: user._id})


  return (
    <div>
      {data && data?.data?.length === 0 ? (
        <div className="empty_container">
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center  pt-4">
          <div className="relative flex flex-col items-center rounded-[10px] border-[1px] border-gray-200 w-full md:w-[576px] mx-auto p-1 sm:p-4 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] border-[#ffffff33] bg-navy-800 text-white ">
            <div className="flex items-center justify-between rounded-t-3xl p-3 w-full">
              <div className="text-lg font-bold text-blue-950 ">History</div>
            </div>

            {data && data?.data.map((data) => (
              <div
                key={data._id}
                className="flex h-full w-full items-start justify-between rounded-md border-[1px] border-[transparent] text-black hover:border-white/20 bg-white px-3 py-[20px] transition-all duration-150  bg-navy-800 hover:border-2 hover:border-blue-950 gap-3"
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="flex h-8 w-8 sm:h-16 sm:w-16 items-center justify-center">
                    <img
                      className="h-full w-full rounded-xl"
                      src={data.logo}
                      alt=""
                    />
                  </div>
                  <div className="flex flex-col">
                    <h5 className="text-xs md:text-base font-bold text-blue-950 ">
                      {data.walletname}({data.walletId})
                    </h5>

                    <div
                      className={` text-center my-1 border-none shadow-none rounded ${
                        data.status == "Success"
                          ? "bg-green-200"
                          : data.status == "Pending"
                          ? "bg-yellow-500"
                          : "bg-red-900"
                      } `}
                    >
                      <p className=" text-xs sm:text-sm font-normal text-white">
                        {data.status}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="break-all">
                  <div className="mt-1 flex items-center justify-end text-navy-700">
                    <div>
                      {/* <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 320 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M311.9 260.8L160 353.6 8 260.8 160 0l151.9 260.8zM160 383.4L8 290.6 160 512l152-221.4-152 92.8z"></path></svg> */}
                      {data.isDeposit ? (
                        <ArrowUpOutlined className="text-green-800 " />
                      ) : (
                        <ArrowDownOutlined className="text-red-800" />
                      )}
                    </div>

                    <div className="ml-1 flex items-center text-sm font-bold text-blue-950">
                      {/* <p> $  </p> */}
                      <p className="ml-1 ">
                        $
                        {data.amount
                          ?.toFixed(2)
                          .toString()
                          ?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      </p>
                    </div>
                    {/* <div className='flex items-center'>
                            {data.isDeposit  ? <ArrowUpOutlined className='text-green-800 mr-3' /> : <ArrowDownOutlined className='text-red-800 mr-3' />}<span >$</span><span className={data.isDeposit  ? 'text-green-800 ml-1' : 'text-red-800 ml-1'}>${data.amount?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                        </div> */}
                  </div>
                  <div className="ml-2 flex items-center justify-end text-sm font-normal text-gray-600 ">
                    {/* <p>30s</p>
                        <p className="ml-1">ago</p> */}
                    <p>{moment(data.createdAt).fromNow()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionHistory;
