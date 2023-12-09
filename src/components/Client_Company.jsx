import { LiaIndustrySolid } from "react-icons/lia";
import { FiUser } from "react-icons/fi";
import style from "../../public/assets/styles/Login.module.css"
import Link from "next/link"

export default function Client_Company(){
    return(
    <div className={style.selector}>
        <div className={style.header}>Registro</div>
        <div className={style.card}>
            <div>Como te quieres registrar?</div>
            <div className={style.btnBx}>
                <div  className={style.Btn}>
                    <span className={style.icon}><Link href = "registro/clientForm"><FiUser/></Link></span>
                    <span className={style.text}>Cliente</span>
                </div>
                <div className={style.Btn}>
                    <span className={style.icon}><Link href = "registro/companyForm"><LiaIndustrySolid/></Link></span>
                    <span className={style.text}>Compania</span>

                </div>

            </div>
            
        </div>
        
    </div>
    )
}