import React, { useState } from "react";
import { QRCode, Alert, Button, Image } from "antd";
import { WalletOutlined } from "@ant-design/icons";
import axios from "axios";
import { BaseUrl } from "../../Root";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
// import { UploadImage } from "../utils/firebase.utils";

const RecieveToken = () => {
  const { user } = useSelector((state) => state.user);

  const [wallet, setWallet] = useState({
    name: "Bitcoin",
    id: "BTC",
    address: "bc1qlwutcrm8gts9ul7977p8gd8efesfq022rl7vt4",
    logo: "https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=024",
  });

  const [showWallet, setShowWallet] = useState(false);
  const [amount, setAmount] = useState("");
  // const [transactionProof, setTransactionProof] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  // let src = "";
  // if (transactionProof) {
  //   src = URL.createObjectURL(transactionProof[0]);
  // }

  const handleRecieveToken = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // const proof = await UploadImage(transactionProof[0]);

    const config = {
      headers: { Authorization: `Bearer ${user.token}` },
    };

    try {
      const res = await axios.post(
        `${BaseUrl}/user/transaction/user/deposit/${user._id}`,
        {
          walletname: wallet.name,
          amount,
          logo: wallet.logo,
          walletId: wallet.id,
          // transactionProof: proof,
        },
        config
      );

      toast.success(res.data.message);
    } catch (error) {
      toast.error("Failed try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="body-font bg-gray-100 pt-2 sm:pt-10 text-gray-600">
      <div className="container mx-auto flex max-w-3xl flex-wrap justify-center rounded-lg bg-white px-5 py-2 md:py-24">
        {/* <!-- QR Code Number Account & Uploadfile --> */}

        <div className=" md:flex">
          <div className="mx-auto">
            {/* drop down start*/}
            <div>
              <div className="w-56 max-w-md mx-auto mb-4">
                <label htmlFor="select" className="font-semibold block py-2">
                  Select Wallet:
                </label>

                <div className="relative">
                  <div
                    onClick={() => setShowWallet((v) => !v)}
                    className="h-10 bg-white flex border border-gray-200 rounded items-center cursor-pointer"
                  >
                    <p
                      name="select"
                      id="select"
                      className="px-4 appearance-none outline-none text-gray-800 w-full"
                    >
                      {" "}
                      {wallet.name}
                    </p>

                    <button
                      type="button"
                      className="cursor-pointer outline-none focus:outline-none transition-all text-gray-300 hover:text-gray-600"
                    >
                      <svg
                        className="w-4 h-4 mx-2 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </button>
                    <button type="button">
                      <label
                        htmlFor="show_more"
                        className="cursor-pointer outline-none focus:outline-none  border-gray-200 transition-all text-gray-300 hover:text-gray-600"
                      >
                        <svg
                          className={`w-4 h-4 mx-2 fill-current ${
                            !showWallet ? "rotate-180" : ""
                          }`}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="18 15 12 9 6 15"></polyline>
                        </svg>
                      </label>
                    </button>
                  </div>

                  <input
                    type="checkbox"
                    name="show_more"
                    id="show_moree"
                    className="hidden peer"
                    checked={showWallet}
                    onChange={() => setShowWallet((v) => !v)}
                  />
                  <div className="absolute z-50 rounded shadow bg-white overflow-hidden hidden peer-checked:flex flex-col w-full mt-1 border border-gray-200">
                    <div
                      className="cursor-pointer group"
                      onClick={() =>
                        setWallet({
                          name: "Tether",
                          id: "TRC20 USDT",
                          address: "TTy84MGCuq5kKxqGhQeCPBg2nvxpK4AfgQ",
                          logo: "https://cryptologos.cc/logos/tether-usdt-logo.png?v=024",
                        })
                      }
                    >
                      <button
                        type="button"
                        className={`w-full text-start block p-2  border-l-4 group-hover:border-blue-600 group-hover:bg-gray-100 ${
                          wallet.id === "TRC20 USDT" ? "border-blue-950" : ""
                        }`}
                      >
                        USDT
                      </button>
                    </div>

                    <div
                      className="cursor-pointer group border-t"
                      onClick={() =>
                        setWallet({
                          name: "Bitcoin",
                          id: "BTC",
                          address: "bc1qlwutcrm8gts9ul7977p8gd8efesfq022rl7vt4",
                          logo: "https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=024",
                        })
                      }
                    >
                      <button
                        type="button"
                        className={`w-full text-start block p-2  border-l-4 group-hover:border-blue-600 group-hover:bg-gray-100 ${wallet.id == "BTC" ? "border-blue-950" : ""}`}
                      >
                        Bitcoin
                      </button>
                    </div>

                    <div
                      className="cursor-pointer group border-t"
                      onClick={() =>
                        setWallet({
                          name: "Ethereum",
                          id: "ETH",
                          address: "0x11CbAb83E5f90BC682fE2b3FFe73eA56C8ED2B58",
                          logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png?v=024",
                        })
                      }
                    >
                      <button
                        type="button"
                        className={`w-full text-start block p-2  border-l-4 group-hover:border-blue-600 group-hover:bg-gray-100 ${
                          wallet.id === "ETH" ? "border-blue-950" : ""
                        }`}
                      >
                        Ethereum
                      </button>
                    </div>

                    <div
                      className="cursor-pointer group border-t"
                      onClick={() =>
                        setWallet({
                          name: "Litecoin",
                          id: "LTC",
                          address:
                            "ltc1qlm8hhpa900nh6v62y2gyswlsur763ry9n534a2",
                          logo: "https://cryptologos.cc/logos/litecoin-ltc-logo.png?v=024",
                        })
                      }
                    >
                      <button
                        className={`w-full text-start block p-2  border-l-4 group-hover:border-blue-600 group-hover:bg-gray-100 ${
                          wallet.id === "LTC" ? "border-blue-950" : ""
                        }`}
                      >
                        Litecoin
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* drop down end*/}

            <QRCode
              className="mx-auto mt-2 h-52 w-52 rounded-lg border p-2 md:mt-0"
              value={wallet.address}
            />

            <div className="w-56 mx-auto">
              <h1 className="font-laonoto mt-2 text-center text-xl font-bold ">
                {wallet.name}
              </h1>
              <p className="mt-1 text-center break-all font-medium text-green-500 cursor-pointer ">
                {wallet.address}
              </p>
            </div>

            <form className="pt-4" onSubmit={handleRecieveToken}>
              <div className="pt-6 bg-orange-100 p-3 gap-3 rounded-lg w-52 mx-auto mb-4">
                <h2 className="text-sm text-blue-950 text-start">
                  Deposit Amount In Dollar
                </h2>
                <input
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  min={"1"}
                  type="number"
                  placeholder="input amount"
                  className="border w-full mx-auto p-2 rounded invalid:border-red-500 out-of-range:border-red-500"
                  required
                />
              </div>

              {/* <!-- component --> */}
              {/* <div className="mx-auto w-52">
                <div className="m-4">
                  <div className="flex w-full items-center justify-center">
                    <label className="flex h-14 w-full cursor-pointer flex-col border-4 border-dashed border-gray-200 hover:border-gray-300 hover:bg-gray-100">
                      <div className="mt-4 flex items-center justify-center space-x-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="h-6 w-6 text-gray-400"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                          />
                        </svg>

                        <p className="font-laonoto text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                          upload
                        </p>
                      </div>
                      <input
                        onChange={(e) => setTransactionProof(e.target.files)}
                        type="file"
                        className="opacity-0"
                        required
                      />
                    </label>
                  </div>

                  <div className="mt-2 border rounded">
                    {transactionProof && (
                      <Image
                        preview={true}
                        rootClassName="rating-image"
                        className=" rounded w-full aspect-square object-cover"
                        src={src}
                      />
                    )}
                  </div>


                </div>
              </div> */}

              {!isLoading && (
                <button className="mx-auto block rounded-md border bg-blue-500 px-6 py-2 text-white outline-none">
                  Submit
                </button>
              )}

              {isLoading && (
                <Button
                  type="primary"
                  className="mx-auto block rounded-md border bg-blue-500 px-6 py-2 text-white outline-none"
                  loading
                >
                  Loading
                </Button>
              )}
            </form>

            {/* Disclaimer */}
            <div className="mt-4 bg-blue-500 rounded-md p-6 text-white">
              <p>
                Send only {wallet?.name} ({wallet?.id}) to this address.
              </p>
              <p>Sending any other coins may result in permanent loss.</p>
            </div>
          </div>

          {/* <!-- Step Checkout --> */}
          <div className="mt-8 max-w-sm md:mt-0 md:ml-10 md:w-2/3">
            <div className="relative flex pb-12">
              <div className="absolute inset-0 flex h-full w-10 items-center justify-center">
                <div className="pointer-events-none h-full w-1 bg-gray-200"></div>
              </div>
              <div className="relative z-10 inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-500 text-white">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <div className="flex-grow pl-4">
                <h2 className="title-font mb-1 text-sm font-medium tracking-wider text-gray-900">
                  STEP 1
                </h2>
                <p className="font-laonoto leading-relaxed">
                  Select <b>Wallet Address</b>
                </p>
              </div>
            </div>

            <div className="relative flex pb-12">
              <div className="absolute inset-0 flex h-full w-10 items-center justify-center">
                <div className="pointer-events-none h-full w-1 bg-gray-200"></div>
              </div>
              <div className="relative z-10 inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-500 text-white">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                </svg>
              </div>
              <div className="flex-grow pl-4">
                <h2 className="title-font mb-1 text-sm font-medium tracking-wider text-gray-900">
                  STEP 2
                </h2>
                <p className="font-laonoto leading-relaxed">
                  Scan <b>QR Code</b> or Copy <b>Wallet Address</b>
                </p>
              </div>
            </div>

            <div className="relative flex pb-12">
              {/* <div className="absolute inset-0 flex h-full w-10 items-center justify-center">
                <div className="pointer-events-none h-full w-1 bg-gray-200"></div>
              </div> */}
              <div className="relative z-10 inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-500 text-white">
                <WalletOutlined className="" />
              </div>
              <div className="flex-grow pl-4">
                <h2 className="title-font mb-1 text-sm font-medium tracking-wider text-gray-900">
                  STEP 3
                </h2>
                <p className="font-laonoto leading-relaxed">
                  Deposit <b>Token</b> to exchange,
                </p>
                <p>
                  By direct transfer from your account to your{" "}
                  <b>Wallet Address</b>.
                </p>
              </div>
            </div>

            {/* <div className="relative flex pb-12">
              <div className="relative z-10 inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-500 text-white">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="5" r="3"></circle>
                  <path d="M12 22V8M5 12H2a10 10 0 0020 0h-3"></path>
                </svg>
              </div>

              <div className="flex-grow pl-4">
                <h2 className="title-font mb-1 text-sm font-medium tracking-wider text-gray-900">
                  STEP 4
                </h2>
                <p className="font-laonoto leading-relaxed">
                  upload a valid proof of <b>Deposit</b> .
                </p>
              </div>
            </div> */}

          </div>
        </div>
      </div>
    </section>
  );
};
export default RecieveToken;


