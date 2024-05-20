import React, { useEffect, useState } from 'react'

import { Button, Menu, Typography, Avatar } from 'antd'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { HomeOutlined, BulbOutlined, FundOutlined, MenuOutlined, UserOutlined, LoginOutlined, LogoutOutlined, MailOutlined } from '@ant-design/icons'
import { useSelector , useDispatch} from 'react-redux'
import { logout } from '../services/userSlice'
// import icon from '../images/cryptocurrency.png'



const Navbar = () => {
    const {user, isAuthenticated} = useSelector((state) => state.user)
    const {pathname} = useLocation();
   
    const currentRoute = pathname.slice(1, )
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [activeMenu, setActiveMenu] = useState(true)
    const [screensize, setScreensize] = useState(window.innerWidth)


    const handleRedirect = () => setActiveMenu(v => !v)


    useEffect(() => {
        const handleResize = () => {
            setScreensize(window.innerWidth)
        }

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, [])

    useEffect(() => {
        if (screensize < 768) {
            setActiveMenu(false)
        } else {
            setActiveMenu(true)
        }
    }, [screensize]);


    const handleLogout = () => {
        dispatch(logout()) 
    }


    return (
        <div className='nav-container px-3'>
            <div className='logo-container'>
                {/* <Avatar src={icon} size='large' /> */}
                <Avatar src={"data:image/png;base64,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"} size='large' />
                <Typography.Title level={2} className='logo'>
                    <Link to='/'>SafePal</Link>
                </Typography.Title>

                <Button className='menu-control-containe ml-auto cursor-pointer lg:hidden ' onClick={handleRedirect} >
                    <MenuOutlined />
                </Button>

            </div>
            {activeMenu && (
                <Menu theme='dark'  >
                    <Menu.Item icon={<HomeOutlined />} onClick={() => navigate("/")} key={1} className={!currentRoute ? 'bg-blue-500' : ""} >
                        <Link  className='w-full' to='/'
                        >Home</Link>
                       
                    </Menu.Item>

                    <Menu.Item icon={<FundOutlined />} onClick={() => navigate("/cryptocurrencies")} key={2} className={currentRoute === "cryptocurrencies" ? 'bg-blue-500' : ""} >
                        <Link to='/cryptocurrencies'>CryptoCurrencies</Link>
                    </Menu.Item>

                    {isAuthenticated && <Menu.Item icon={<BulbOutlined />} onClick={() => navigate("/payment")} key={3} className={currentRoute === "payment" ? 'bg-blue-500' : ""} >
                        <Link to='/payment'>Payment</Link>
                    </Menu.Item>}

                    {/* <Menu.Item icon={<BulbOutlined />} onClick={() => navigate("/news")} key={3} className={currentRoute === "news" ? 'bg-blue-500' : ""} >
                        <Link to='/news'>News</Link>
                    </Menu.Item> */}

                    <Menu.Item icon={<MailOutlined />} onClick={() => navigate("/contactus")}  key={4}  className={currentRoute === "contactus" ? 'bg-blue-500' : ""}>
                        <Link to='/contactus'>Contact Us</Link>
                    </Menu.Item>

                    {isAuthenticated ? <>

                    <Menu.Item icon={<UserOutlined />} onClick={() => navigate("/profile")} key={5} className={currentRoute === "profile" ? 'bg-blue-500' : ""}>
                        <Link to='/profile'>Profile</Link>
                    </Menu.Item>

                    <Menu.Item icon={<LogoutOutlined />} onClick={handleLogout} key={6} >
                        <Link to='/'>Logout</Link>
                    </Menu.Item>
                    
                    </>
                    
                :

                    <Menu.Item icon={<LoginOutlined />} onClick={() => navigate("/auth")} key={7} className={currentRoute === "auth" ? 'bg-blue-500' : ""} >
                        <Link to='/auth'>Login/Signup</Link>
                    </Menu.Item>
                }


                </Menu>

            )}

        </div>
    )
}

export default Navbar
