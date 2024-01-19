"use client"

import style from "../../../public/assets/styles/Recompensa.module.css"
import Image from "next/image"
import Link from "next/link"
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useState, useEffect } from "react";

export default function Recompensa(){

    const { user } = useContext(AuthContext);

    useEffect(() => {
        AOS.init({
          duration:2000
      });
      }, []);

    return(
        <div className={style.cont}>
            <div className={style.content}>
                <div className={style.header} data-aos="fade-up">
                  <div className={style.line}></div>
                  <h3>Canjear Codigo</h3> 
                </div>
                <div className={style.bx} data-aos="fade-up">
                    <div className={style.description}>
                        <span>Entre el codigo:</span>
                        <p>Aqui podras canjear codigos que esten disponibles para obtener OSP de manera gratuita.</p>
                    </div>
                    <div className={style.input}>
                        <input type="text" name="" id="" placeholder="Codigo" />
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