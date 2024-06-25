import { useQueryClient } from "@tanstack/react-query";
import { Drawer, Image } from "antd";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { rejectTransationmutation, verifyTransationmutation } from "../services/request";
import { toast } from "react-toastify";

const Cart = ({ open, setOpen, txn }) => {
  const navigate = useNavigate();
  const rejectmutate = rejectTransationmutation()
 const verifymutation = verifyTransationmutation()
  const queryClient = useQueryClient()
  const handleOk = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleTransactionReject = async() => {
    try {
       await rejectmutate.mutateAsync(txn._id)
       await queryClient.invalidateQueries({ queryKey: ['transactions'] })
       toast.success("transaction rejected successfully")
       setOpen(false)
        
    } catch (error) {
        toast.error("rejection failed") 
    }
  
  };


  const handleTransactionVerify = async() => {
    try {
       await verifymutation.mutateAsync({userId: txn.sender._id, txnId: txn._id})
       await queryClient.invalidateQueries({ queryKey: ['transactions'] })
       toast.success("transaction verify successfully")
       setOpen(false)
        
    } catch (error) {
        toast.error("verify failed") 
    }
  
  };



  return (
    <>
      <Drawer
        placement="right"
        closable={handleCancel}
        onClose={handleOk}
        open={open}
      >
        <div className="w-full sm:w-80 rounded bg-gray-50 px-6 pt-8 shadow-lg">
          <img
            src={txn?.logo}
            alt={txn?._id + "icon"}
            className="mx-auto w-16 py-4"
          />
          <div className="flex flex-col justify-center items-center gap-2">
            <h4 className="font-semibold">{txn?.walletname}</h4>
          </div>
          <div className="flex flex-col gap-3 border-b py-6 text-xs">
           
            {/* <p className="flex justify-between items-center">
              <span className="text-gray-400">Order Type:</span>
              <span
                className={`${
                  txn?.isVerify ? "bg-green-900" : "bg-red-900"
                } text-white p-1 rounded`}
              >
                {txn?.isVerify ? "Verified" : "unverify"}
              </span>
            </p> */}

            <p className="flex justify-between">
              <span className="text-gray-400">Customer:</span>
              <span>{txn?.sender?.username}</span>
            </p>

            <p className="flex justify-between gap-2">
              <span className="text-gray-400 flex-1">Bitcoin:</span>
              {/* <span className="flex-1 text-end">
                {txn?.sender?.wallet?.Bitcoin?.cryptobalance}(Btc)
              </span> */}
              <span className="flex-1 text-end">
                ${txn?.sender?.wallet?.Bitcoin?.fiatbalance?.toFixed(2).toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </span>
            </p>
            <p className="flex justify-between gap-2">
              <span className="text-gray-400 flex-1">Ethereum:</span>
              {/* <span className="flex-1 text-end">
                {txn?.sender?.wallet?.Ethereum?.cryptobalance}(Eth)
              </span> */}
              <span className="flex-1 text-end">
                ${txn?.sender?.wallet?.Ethereum?.fiatbalance?.toFixed(2).toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </span>
            </p>
            <p className="flex justify-between gap-2">
              <span className="text-gray-400 flex-1">Litecoin:</span>
              {/* <span className="flex-1 text-end">
                {txn?.sender?.wallet?.Litecoin?.cryptobalance}(Ltc)
              </span> */}
              <span className="flex-1 text-end">
                ${txn?.sender?.wallet?.Litecoin?.fiatbalance?.toFixed(2).toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </span>
            </p>
            <p className="flex justify-between flex-1 gap-2">
              <span className="text-gray-400">Tether:</span>
              {/* <span className="flex-1 text-end">
                {txn?.sender?.wallet?.Tether?.cryptobalance}(Usdt)
              </span> */}
              <span className="flex-1 text-end">
                ${txn?.sender?.wallet?.Tether?.fiatbalance?.toFixed(2).toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </span>
            </p>

            <button
              onClick={() => navigate("/user/" + txn.sender._id)}
              type="button"
              className="text-indigo-600 hover:text-indigo-900 text-lg font-bold"
            >
              View All
            </button>
          </div>
          <div className="flex flex-col gap-3 pb-6 pt-2 text-xs">
            <table className="w-full text-left">
              <thead>
                <tr className="flex">
                  <th className="w-full py-2">Product</th>
                  <th className="min-w-[44px] py-2">QTY</th>
                </tr>
              </thead>
              <tbody>
                <tr className="flex">
                  <td className="flex-1 py-1">
                  
                    Order Type:
                  </td>
                  <td className="min-w-[44px]">
                      {txn?.isDeposit ? "Deposit" : "Withdraw"}
                  </td>
                </tr>
                <tr className="flex">
                  <td className="flex-1 py-1">
                    Amount:
                  </td>
                  <td className="min-w-[44px]">
                    ${txn?.amount?.toFixed(2).toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </td>
                </tr>
                <tr className="flex py-1">
                  <td className="flex-1">Transaction date:</td>
                  <td className="min-w-[44px]">
                    {moment(txn.createdAt).format("MMM DD, yyyy")}
                  </td>
                </tr>
                {/* <tr className="flex py-1">
                  <td className="flex-1">Transaction proof:</td>
                 
                    <td className="min-w-[44px] flex-1">
                      <Image src={txn?.transactionProof} />
                    </td>
                
                </tr> */}



              </tbody>
            </table>


                {!txn.isVerify && <div className="space-x-3 flex ">
                    <button disabled={rejectmutate.isPending || verifymutation.isPending} onClick={handleTransactionReject} type="button" className={`bg-red-900 text-white font-bold text-lg p-1 rounded border-none outline-none ${rejectmutate.isPending ? "bg-opacity-70": ""} flex-1`}>Reject</button> 
                    <button disabled={verifymutation.isPending || rejectmutate.isPending} type="button" onClick={handleTransactionVerify} className={`bg-green-900 text-white font-bold text-lg p-1 rounded border-none outline-none flex-1 ${verifymutation.isPending ? "bg-opacity-70": ""}`}>Approve</button> 
                </div>}


            <div className=" border-b border border-dashed"></div>
            <div className="py-4 justify-center items-center flex flex-col gap-2">
              {txn?.sender?.email && (
                <p className="flex gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M21.3 12.23h-3.48c-.98 0-1.85.54-2.29 1.42l-.84 1.66c-.2.4-.6.65-1.04.65h-3.28c-.31 0-.75-.07-1.04-.65l-.84-1.65a2.567 2.567 0 0 0-2.29-1.42H2.7c-.39 0-.7.31-.7.7v3.26C2 19.83 4.18 22 7.82 22h8.38c3.43 0 5.54-1.88 5.8-5.22v-3.85c0-.38-.31-.7-.7-.7ZM12.75 2c0-.41-.34-.75-.75-.75s-.75.34-.75.75v2h1.5V2Z"
                      fill="#000"
                    ></path>
                    <path
                      d="M22 9.81v1.04a2.06 2.06 0 0 0-.7-.12h-3.48c-1.55 0-2.94.86-3.63 2.24l-.75 1.48h-2.86l-.75-1.47a4.026 4.026 0 0 0-3.63-2.25H2.7c-.24 0-.48.04-.7.12V9.81C2 6.17 4.17 4 7.81 4h3.44v3.19l-.72-.72a.754.754 0 0 0-1.06 0c-.29.29-.29.77 0 1.06l2 2c.01.01.02.01.02.02a.753.753 0 0 0 .51.2c.1 0 .19-.02.28-.06.09-.03.18-.09.25-.16l2-2c.29-.29.29-.77 0-1.06a.754.754 0 0 0-1.06 0l-.72.72V4h3.44C19.83 4 22 6.17 22 9.81Z"
                      fill="#000"
                    ></path>
                  </svg>
                  {txn.sender.email}
                </p>
              )}
              {txn?.sender?.phone_number && (
                <p className="flex gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      fill="#000"
                      d="M11.05 14.95L9.2 16.8c-.39.39-1.01.39-1.41.01-.11-.11-.22-.21-.33-.32a28.414 28.414 0 01-2.79-3.27c-.82-1.14-1.48-2.28-1.96-3.41C2.24 8.67 2 7.58 2 6.54c0-.68.12-1.33.36-1.93.24-.61.62-1.17 1.15-1.67C4.15 2.31 4.85 2 5.59 2c.28 0 .56.06.81.18.26.12.49.3.67.56l2.32 3.27c.18.25.31.48.4.7.09.21.14.42.14.61 0 .24-.07.48-.21.71-.13.23-.32.47-.56.71l-.76.79c-.11.11-.16.24-.16.4 0 .08.01.15.03.23.03.08.06.14.08.2.18.33.49.76.93 1.28.45.52.93 1.05 1.45 1.58.1.1.21.2.31.3.4.39.41 1.03.01 1.43zM21.97 18.33a2.54 2.54 0 01-.25 1.09c-.17.36-.39.7-.68 1.02-.49.54-1.03.93-1.64 1.18-.01 0-.02.01-.03.01-.59.24-1.23.37-1.92.37-1.02 0-2.11-.24-3.26-.73s-2.3-1.15-3.44-1.98c-.39-.29-.78-.58-1.15-.89l3.27-3.27c.28.21.53.37.74.48.05.02.11.05.18.08.08.03.16.04.25.04.17 0 .3-.06.41-.17l.76-.75c.25-.25.49-.44.72-.56.23-.14.46-.21.71-.21.19 0 .39.04.61.13.22.09.45.22.7.39l3.31 2.35c.26.18.44.39.55.64.1.25.16.5.16.78z"
                    ></path>
                  </svg>
                  {txn.sender.phone_number}
                </p>
              )}
            </div>
          </div>
        </div>
       

      </Drawer>
    </>
  );
};
export default Cart;
