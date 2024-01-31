"use client"

import style from "../../../public/assets/styles/RegaloDialog.module.css"
import BeatLoader from "react-spinners/BeatLoader"
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";
import Image from "next/image"


export default function Regalo({header, content,SetActive}){

    useEffect(() => {
        AOS.init({
          duration:200
      });
      }, []);


    return(
        <div className={style.cont} /*onClick = {(event) => {event.stopPropagation()}}*/ onClick={() => SetActive(false)}>
            <div className={style.bx} data-aos="zoom-in">
                <div className={style.contBx}>
                    <div className={style.imageBx}>
                        <Image 
                            layout="fill"
                            objectFit="cover"
                            src = "/assets/images/[removal.ai]_a597e4f5-c692-4351-9728-dfde7becd031-caja_de_regalo_cartoon_de_color_azul_oscuro_con_3.png"/>
                    </div>
                    
                    <div className={style.info}>
                    <div className={style.header}>
                        {header}
                    </div>
                    <div className={style.content}>
                        {content}
                    </div>

                </div>
                
                </div>
                
                

            </div>
            
        </div>
    )
}