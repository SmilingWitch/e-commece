"use client"

import style from "../../public/assets/styles/Navbar.module.css"
import { MdSearch } from "react-icons/md";
import { LuShoppingCart } from "react-icons/lu";
import { FaRegUserCircle } from "react-icons/fa";
import { SlWallet } from "react-icons/sl";
import Link from "next/link"
import Image from "next/image"
import Cart from "./Cart";
import MyAccount from "./MyAccount";
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import useMediaQuery from '../components/functions/MediaQuery';
import { FaRegBell } from "react-icons/fa";


export default function NavBarMobile({SetCart, cart,SetMyAccount,myAccount}){

    const { user } = useContext(AuthContext);
    const { credential } = useContext(AuthContext);

    function handleKeyDown(event) {
        if (event.key === 'Enter') {
          if (router.pathname !== '/catalogo') {
            router.push('/catalogo');
          }
        }
       }

       const isMobile = useMediaQuery('(max-width: 768px)');

    return(
        <div className={style.contMobile}>
            <section className={style.superiorMobile}>
            <Link href = "/home">
                <div className={style.logo}>
                    <img src="/assets/images/[removal.ai]_597ed435-d169-410c-962e-7dbf022aae9f-photo1702144866.png" alt="" />
                    <span>rca Store</span>
                </div>
            </Link>
                <div className={style.iconBx}>
                    <div className={style.contIcon}>
                        <span><Link href = "/notificationes"><FaRegBell/></Link></span>
                    </div>
                    {user === null ? <div className={style.contIcon1}>
                        <span className={style.icon2}><Link href = "/accounts/login"><FaRegUserCircle/></Link></span>
                        <div className={style.cont2}>Entrar o registrarse</div>
                    </div>:
                    <div className={style.contLogg}>
                        <span className={style.iconLogg}>
                        <div className={style.linkLogg} onClick = {() => SetMyAccount(true)}>
                            <div className={style.circle}>
                            {credential ? (<Image
                                width={50}
                                height={50} 
                                src={credential.image}  />):<Image
                                width={50}
                                height={50} 
                                src="/assets/images/avatar.svg"  /> }
                            </div>   
                        </div></span>
                    </div>
                     }
                </div>

            </section>
            {/*<section className={style.section2}>
            <div className={style.inputBx}>
                <div className={style.input}> 
                    <input type="text" 
                    name="" 
                    id="" 
                    placeholder="Buscar"
                    onKeyDown={handleKeyDown} />
                    <div className={style.icon}><Link href = "/catalogo"><MdSearch/></Link></div>
                </div>

            </div>
                </section>*/}
            {cart && (
              <Cart SetCart = {SetCart} />
            )}
            {myAccount && (
                <MyAccount SetMyAccount = {SetMyAccount} />
            )
            }
        </div>
    )
}