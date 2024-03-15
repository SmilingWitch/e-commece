"use client"

import style from "../../public/assets/styles/Navbar.module.css"
import { MdSearch } from "react-icons/md";
import { LuShoppingCart } from "react-icons/lu";
import { FaRegUserCircle } from "react-icons/fa";
import { SlWallet } from "react-icons/sl";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useState, useEffect } from "react";
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Link from "next/link"
import Image from "next/image"
import Cart from "./Cart";
import MyAccount from "./MyAccount";
import { FaRegBell } from "react-icons/fa";
import axios from "axios"
import BeatLoader from "react-spinners/BeatLoader"


export default function Navbar({SetCart, cart,SetMyAccount, myAccount}){

    const pathname = usePathname()
    const [visible,Setvisible] = useState(false)
    
    const { user } = useContext(AuthContext);
    const { credential } = useContext(AuthContext);
    console.log("USER",user)

    const router = useRouter();
    
    function handleKeyDown(event) {
        if (event.key === 'Enter') {
          if (router.pathname !== '/catalogo') {
            router.push('/catalogo');
          }
        }
       }
       
    useEffect(() => {
        console.log(visible);
       }, [visible]);

      

    return(
        <div className={style.cont}>
            <section className={style.superior}>
            <Link href = "/dashboard/wallet">
                <div className={style.logo}>
                <img src="/assets/images/[removal.ai]_597ed435-d169-410c-962e-7dbf022aae9f-photo1702144866.png" alt="" />
                    <span>rca Store</span>
                </div>
            </Link>

                
                <div className={style.iconBx}>
                    {user === null ? <div className={style.contIcon1}>
                        <span className={style.icon2}><Link href = "/accounts/login"><FaRegUserCircle/></Link></span>
                        <div className={style.cont2}>Entrar o registrarse</div>
                    </div>: 
                    <div className={style.contLogg}>
                        <span className={style.iconLogg}>
                        <div className={style.linkLogg} onClick = {() => SetMyAccount(true)}>
                            <div className={style.circle}>
                            {credential.image !== null ? (<Image
                                width={40}
                                height={40} 
                                src={credential.image}  />):<Image
                                width={40}
                                height={40} 
                                src="/assets/images/imagenPorDefecto.png"  /> }
                                
                            </div>   
                        </div></span>
                    </div>
                     }
                    <div className={style.contIcon}>
                        <span><Link href = "/dashboard/wallet"><FaRegBell/></Link></span>
                    </div>
                </div>

            </section>

            {myAccount && user !== null && (
                <MyAccount SetMyAccount = {SetMyAccount} />
            )
            }     
        </div>
        ) 
}