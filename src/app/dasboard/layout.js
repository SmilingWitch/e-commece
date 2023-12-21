"use client"
import MenuFloatinButton from '@/components/MenuFloatingBtn';
import useMediaQuery from '../../components/functions/MediaQuery';
import Navbar from '@/components/Navbar';
import NavBarMobile from '@/components/NavBarMobile';
import {MdSearch} from "react-icons/md"


export default function RootLayout({ children }) {
 const isMobile = useMediaQuery('(max-width: 768px)');

 return (
   <>
     {isMobile ? <NavBarMobile /> : <Navbar />}
     <MenuFloatinButton/>
     <main >{children}</main>

   </>
 );
}
