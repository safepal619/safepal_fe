
import { Spin } from 'antd';


const CryptoList = ({ wallet, liveCryptoUpdate}) => {



    const ListItem = ({ Wallet, Token }) => {

        return (
            <div className="flex h-full w-full items-start justify-between rounded-md border-[1px] border-[transparent] dark:hover:border-white/20 bg-white px-3 py-[20px] transition-all duration-150 hover:border-gray-200 dark:!bg-navy-800 dark:hover:!bg-navy-700 gap-3">
                <div className="flex items-center gap-2 sm:gap-3">
                    <div className="flex h-8 w-8 sm:h-16 sm:w-16 items-center justify-center">
                        <img
                            className="h-full w-full rounded-xl"
                            src={Wallet?.logo}
                            alt="wallet icon"
                        />
                    </div>
                    <div className="flex flex-col">
                        <h5 className="text-xs md:text-base font-bold text-gray-600 ">
                            {Wallet?.walletname} ({Wallet?.walletId})
                        </h5>
                        <p>
                            <span className={Math.sign(parseFloat(Token?.change, 10)) === 1 ? 'text-green-700 ' : 'text-red-700'}> ${parseFloat(Token?.price, 10).toFixed(2).toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                            <span className='text-gray-400 mx-1 sm:mx-4'>|</span>
                            <span className=' text-black'>{Token?.change}%</span>

                        </p>



                    </div>
                </div>

                <div className='break-all'>
                    <div className="mt-1 flex items-center justify-end text-navy-700 text-clip ">
                       
                        <div className="ml-1 flex items-center text-xs sm:text-sm  font-bold text-gray-600">

                            <p className="ml-1">{Wallet?.cryptobalance?.toFixed(2).toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} </p>
                        </div>
                    </div>
                    <div className="ml-2 flex items-center justify-end text-sm font-normal text-gray-600 ">
                        <p className="ml-1">${Wallet?.fiatbalance?.toFixed(2).toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>

                    </div>
                </div>

            </div>

        )
    }



    return (

        <div className="flex flex-col justify-center items-center  pt-4">
            <div className="relative flex flex-col items-center rounded-[10px] border-[1px] border-gray-200 w-full md:w-[576px] mx-auto p-1 sm:p-4 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none">
                

            {(!wallet) && <div className='h-24'>
                    <Spin />
                </div>
                }
                
                {(wallet) && <>
                <div className="flex items-center justify-between rounded-t-3xl p-3 w-full">
                    <div className="text-lg font-bold text-navy-700 dark:text-white">
                        <h1 className='border-b-4 border-b-green-500 rounded'>Crypto</h1>
                    </div>
                </div>

                

                    <ListItem key={liveCryptoUpdate.Bitcoin.price} Token={liveCryptoUpdate.Bitcoin} Wallet={wallet?.Bitcoin} />
                    <ListItem key={liveCryptoUpdate.Ethereum.price} Token={liveCryptoUpdate.Ethereum} Wallet={wallet?.Ethereum} />
                    <ListItem key={liveCryptoUpdate.USDT.price} Token={liveCryptoUpdate.USDT} Wallet={wallet?.Tether} />
                    <ListItem key={liveCryptoUpdate.LTC.price} Token={liveCryptoUpdate.LTC} Wallet={wallet?.Litecoin} />
                </>}

            </div>
        </div>

    )
}

export default CryptoList