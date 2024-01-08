import style from "../../public/assets/styles/SideBar.module.css"
import { IoGameControllerOutline } from "react-icons/io5";
import { LuArrowDownToLine, LuArrowUpFromLine } from "react-icons/lu";
import { BiDonateHeart } from "react-icons/bi";
import { GrSave } from "react-icons/gr";
import { IoGiftOutline } from "react-icons/io5";
import { TfiMenuAlt } from "react-icons/tfi";
import { LuLink } from "react-icons/lu";
import { HiOutlineHome } from "react-icons/hi2";
import Link from "next/link"

export default function SideBar(){
    return (
        <div className={style.cont}>
            <button>
                <Link  href="/dashboard/wallet" className={style.link}>
                    <span className={style.btnIcon}><HiOutlineHome/></span>
                    <span>Vista Principal</span>    
                </Link> 
                
            </button>
            <div className={style.finanzas}>
                <h3>Finanzas</h3>
                <ul>
                    <li><Link href="/dashboard/recibir"  className={style.link}>
                        <span className={style.icon}><LuArrowDownToLine/></span>
                        <span>Recibir</span>
                        </Link>
                        
                    </li>
                    <li>
                        <Link  href="/dashboard/enviar"  className={style.link}>
                            <span className={style.icon}>< LuArrowUpFromLine/></span>
                            <span>Enviar</span>    
                        </Link> 
                       
                    </li>
                    <li>
                        <Link  href="/dashboard/guardar"  className={style.link}>
                            <span className={style.icon}><GrSave/></span>
                            <span>Guardar</span>
                        </Link> 
                        
                    </li>
                    <li>
                        <Link  href="/dashboard/donar"  className={style.link}>
                            <span className={style.icon}><BiDonateHeart/></span>
                            <span>Donar</span>    
                        </Link> 
                        
                    </li>
                </ul>
            </div>
            <div className={style.recompensa}>
                <h3>Recompensas</h3>
                <ul>
                    <li>
                        <Link  href="/dashboard/recompensa"  className={style.link}>
                            <span className={style.icon}><IoGiftOutline /></span>
                            <span>Cangear Codigo</span>    
                        </Link> 
                        
                    </li>
                </ul>

            </div>
            <div className={style.config}>
                <h3>Configuracion</h3>
                <ul>
                    <li>
                        <Link  href="/dashboard/link"  className={style.link}>
                            <span className={style.icon}><LuLink/></span>
                            <span>Links de pago</span>    
                        </Link> 
                    </li>
                </ul>

            </div>
            <div className={style.juego}>
                <h3>Juegos</h3>
                <ul>
                    <li>
                        <Link  href="/dashboard/wallet"  className={style.link}>
                            <span className={style.icon}><IoGameControllerOutline/></span>
                            <span>Cerito</span>    
                        </Link> 
                        </li>
                </ul>

            </div>
            
            
            
        </div>
    )
}