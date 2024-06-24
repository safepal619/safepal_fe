import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Layout, Typography, Space } from 'antd'

import { Navbar, Homepage, News, CryptoDetails, Cryptocurrencies , Login, Profile, Signup, VerifyEmail, ForgetPassword, ConfirmSignup, SendToken, ContactUs, RecieveToken, TransactionHistory, VerifyHomepage, Payment, Chat, Dashbroad, UserProfile, Wrapper,} from './component'
import './App.css'
import { useSelector } from 'react-redux';


const App = () => {
    const {isNews, isAuthenticated, user} = useSelector((state) => state.user)

    return (
        <div className='app'>

{(!isAuthenticated || user.status === "User") && <>
            <div className='navbar'>
                <Navbar />
            </div>

            
             <div className='main '>
                <Layout className='md:min-h-[87svh]'>
                    <div className='routes'>
                        <Routes>
                            <Route path='/'  element={isAuthenticated ? <VerifyHomepage /> : <Homepage />} />
                            <Route path='/email-verified'  element={<VerifyEmail />} />
                            <Route path='/forget-password'  element={<ForgetPassword />} />
                            <Route path='/confirm-signup'  element={<ConfirmSignup />} />
                             
                        <Route path='/cryptocurrencies' element={ <Cryptocurrencies />} />
                        <Route path='/payment' element={ <Payment />} />
                           
                        <Route path='/crypto/:coinId' element={<CryptoDetails />} />
                         
                            <Route path='/news' element={<News />} />
                            <Route path='/auth' element={<Login />} />
                            <Route path='/profile' element={<Profile/>} />
                            <Route path='/signup' element={<Signup/>} />
                            <Route path='/chat/:id' element={<Chat />} />



                            <Route path='/sendtoken' element={<SendToken />} />
                            <Route path='/recievetoken' element={<RecieveToken />} />
                            <Route path='/contactus' element={<ContactUs />} />
                            <Route path='/history' element={<TransactionHistory />} />
                            
                        </Routes>

                    </div>
                </Layout>

                <footer className='footer' >
                    <Typography.Title level={5} style={{ color: 'white', textAlign: 'center' }}>
                        SafePal <br />
                        All rights reserved
                    </Typography.Title>
                    <Space className='text-white'>
                        <Link to='/'>Home</Link>
                        <Link to='/exchanges'>Exchanges</Link>
                        <Link to='/news'>News</Link>
                    </Space>
                </footer>
            </div>
            </>
            }

            {user.status === "Admin" && 
            
            <>
                        <Routes>
                            <Route path='/'  element={<Dashbroad />} />                           
                        <Route path='/user/:userId' element={<UserProfile />} />
                        {/* <Route path='/chat/:id' element={<Chat />} /> */}
                        <Route path='/chat/:id' element={<Wrapper />} />
                        </Routes>

                    </>
            
            
            
            // <Dashbroad />
            
            
            }




            <ToastContainer />


        </div>
    )
}

export default App
