"use client"
import MenuFloatinButton from '@/components/MenuFloatingBtn';
import useMediaQuery from '../../components/functions/MediaQuery';
import Navbar from '@/components/Navbar';
import NavBarMobile from '@/components/NavBarMobile';
import {MdSearch} from "react-icons/md"
import {useState} from "react"
import SideBar from '@/components/SideBar';


export default function RootLayout({ children }) {
 const isMobile = useMediaQuery('(max-width: 768px)');
 const [cart, SetCart] = useState(false)
 const [myAccount, SetMyAccount] = useState(false)

 return (
   <>
     {isMobile ? <NavBarMobile SetCart = {SetCart} cart = {cart} SetMyAccount = {SetMyAccount} myAccount = {myAccount}/> :
                 <Navbar SetCart = {SetCart} cart = {cart} SetMyAccount = {SetMyAccount} myAccount = {myAccount}/>}
       {isMobile ? "": <SideBar/>}
      <MenuFloatinButton/>
     <main >{children}</main>
 
   </>
 );
}
