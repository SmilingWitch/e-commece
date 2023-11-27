"use client"

import style from "../../public/assets/styles/Navbar.module.css"
import { MdSearch } from "react-icons/md";
import { LuShoppingCart } from "react-icons/lu";
import { FaRegUserCircle } from "react-icons/fa";
import { SlWallet } from "react-icons/sl";


export default function Navbar(){
    return(
        <div className={style.cont}>
            <section className={style.superior}>
                <div><h1>LOGO</h1></div>
                <div className={style.input}> 
                    <input type="text" name="" id="" placeholder="Buscar" />
                    <div className={style.icon}><MdSearch/></div>
                </div>
                <div className={style.iconBx}>
                    <div className={style.contIcon1}>
                        <span className={style.icon1}><SlWallet/></span>
                        <div className={style.cont1}>Billetera</div>
                    </div>
                    <div className={style.contIcon}>
                        <span><LuShoppingCart/></span>
                    </div>
                    <div className={style.contIcon1}>
                        <span className={style.icon2}><FaRegUserCircle/></span>
                        <div className={style.cont2}>Entrar o registrarse</div>
                    </div>
                </div>

            </section>
            <section>

            </section>
            
        </div>
        ) 
}