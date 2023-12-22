"use client"

import style from "../../public/assets/styles/Navbar.module.css"
import { MdSearch } from "react-icons/md";
import { LuShoppingCart } from "react-icons/lu";
import { FaRegUserCircle } from "react-icons/fa";
import { SlWallet } from "react-icons/sl";
import Link from "next/link"
import Cart from "./Cart";

export default function NavBarMobile({SetCart, cart}){
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
                    <div className={style.contIcon1}>
                        <span className={style.icon1}><Link href = "/dasboard/wallet"><SlWallet/></Link></span>
                        <div className={style.cont1}>Billetera</div>
                    </div>
                    <div className={style.contIcon}>
                        <span onClick = {() => SetCart(true)}><LuShoppingCart/></span>
                    </div>
                    <div className={style.contIcon}>
                        <span><Link href = "/catalogo"><MdSearch/></Link></span>
                    </div>
                    <div className={style.contIcon1}>
                        <span className={style.icon2}><Link href = "/accounts/login"><FaRegUserCircle/></Link></span>
                        <div className={style.cont2}>Entrar o registrarse</div>
                    </div>
                </div>

            </section>
            {cart && (
              <Cart SetCart = {SetCart} />
            )}
        </div>
    )
}