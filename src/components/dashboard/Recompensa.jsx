"use client"

import style from "../../../public/assets/styles/Recompensa.module.css"
import Image from "next/image"
import Link from "next/link"
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';


export default function Recompensa(){

    const { user } = useContext(AuthContext);

    return(
        <div className={style.cont}>
            <div className={style.content}>
                <div className={style.header}>
                  <div className={style.line}></div>
                  <h3>Cangear Codigo</h3> 
                </div>
                <div className={style.bx}>
                    <div className={style.input}>
                        <label >Cangear:</label>
                        <input type="text" name="" id="" />
                    </div>
                    <button>Recibir Premio</button>
                    <div className={style.regalo}>
                        <Image src = "/assets/images/undraw_happy_birthday_re_c16u.svg"
                        width = {300}
                        height={300}></Image>
                    </div>
                </div>
            </div>
        </div> 
    )
}