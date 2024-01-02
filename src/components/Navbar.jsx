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
            <Link href = "/home">
                <div className={style.logo}>
                    <img src="/assets/images/[removal.ai]_597ed435-d169-410c-962e-7dbf022aae9f-photo1702144866.png" alt="" />
                    <span>rca Store</span>
                </div>
            </Link>
            <div className={style.inputBx}>
                <div className={style.input}> 
                    <input type="text" 
                    name="" 
                    id="" 
                    placeholder="Buscar"
                    onKeyDown={handleKeyDown} />
                    <div className={style.icon}><Link href = "/catalogo" className={style.link}><MdSearch/></Link></div>
                </div>

            </div>
                
                <div className={style.iconBx}>
                    <div className={style.contIcon1}>
                        <span className={style.icon1}><Link href = "/dasboard/wallet"><SlWallet/></Link></span>
                        <div className={style.cont1}>Billetera</div>
                    </div>
                    <div className={style.contIcon}>
                        <span onClick = {() => SetCart(true)}><LuShoppingCart/></span>
                    </div>
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
                        {credential && (<div className={style.name}>{credential.username}</div> )}
                            <div className={style.circle}>
                            {credential && (<Image
                                width={40}
                                height={40} 
                                src={credential.image}  />)}
                            </div>   
                        </div></span>
                    </div>
                     }
                    
                </div>

            </section>
            <section className={style.section2}>
                <div className={style.productsBx}>
                    <div className={style.btnProducts} onClick={() => Setvisible(!visible)}>
                        <span>Productos</span>
                        <span><MdKeyboardArrowDown/></span>
                    </div>
                    <div className={ visible === true ? `${style.productList}` : `${style.invisible}`}  >
                        <ul>
                            <li>Laptops</li>
                            <li>Telefonos</li>
                            <li>Ropa</li>
                            <li>Camara</li>
                            <li>Mochilas</li>
                            <li>Mandos</li>
                        </ul>

                    </div>

                </div>
                <div className={style.routes}>
                    <ul>
                        <li><Link href = "/dasboard/wallet" className={`link ${pathname === '/dasboard/wallet' ? `${style.active} `: ''}`}>Billetera OrcaMarket</Link></li>
                        <li><Link href = "/home">Ofertas</Link></li>
                        <li><Link href = "/catalogo" className={`link ${pathname === '/catalogo' ? `${style.active} `: ''}`}>Catalogo</Link></li>
                        <li><Link href = "/home">Preguntas frecuentes</Link></li>
                    </ul>
                </div>
            </section>

            {cart && (
              <Cart SetCart = {SetCart} />
            )}
            {myAccount && user !== null && (
                <MyAccount SetMyAccount = {SetMyAccount} />
            )
            }     
        </div>
        ) 
}