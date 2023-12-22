"use client"
import MenuFloatinButton from '@/components/MenuFloatingBtn';
import useMediaQuery from '../../components/functions/MediaQuery';
import Navbar from '@/components/Navbar';
import NavBarMobile from '@/components/NavBarMobile';
import {MdSearch} from "react-icons/md"
import {useState} from "react"


export default function RootLayout({ children }) {
 const isMobile = useMediaQuery('(max-width: 768px)');
 const [cart, SetCart] = useState(false)

 return (
   <>
     {isMobile ? <NavBarMobile SetCart = {SetCart} cart = {cart}/> :
                 <Navbar SetCart = {SetCart} cart = {cart}/>}
     <MenuFloatinButton/>
     <main >{children}</main>
 
   </>
 );
}
