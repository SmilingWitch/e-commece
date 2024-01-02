"use client"

import style1 from "../../public/assets/styles/Cart.module.css"
import style from "../../public/assets/styles/ChangePassword.module.css"
import {VscClose} from "react-icons/vsc"
import { IoIosArrowBack } from "react-icons/io";

export default function EditarDatos({SetActiveEdit, closeAll}){
    return(
        <div className={style.cont} onClick = {closeAll}>

            <div className={style.bx} onClick = {(event) => {event.stopPropagation()}}>
                <div className={style1.header}>
                
                    <div className={style1.header1}>
                        <h2 className = {style1.iconH2} onClick = {() =>SetActiveEdit(false) } ><IoIosArrowBack/></h2>
                        <h2>Editar Datos</h2>
                    </div>
                </div>
   
                    </div>

                </div>
 
    )
}