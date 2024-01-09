"use client"

import style from "../../../public/assets/styles/Recibir.module.css"
import { BsQrCodeScan } from "react-icons/bs";
import { useState, useEffect } from "react";
import Image from "next/image"
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Recibir(){

        const [link, SetLink] = useState(false)
        useEffect(() => {
            AOS.init({
              duration:1000
          });
          }, []);


    return(
        <div className={style.cont}>
        <div className={style.content}>
            <div className={style.header}>
              <div className={style.line}></div>
              <h3>Recibir OSP</h3> 
            </div>

            <div className={style.bx}>
                <div className={style.input}>
                    <label >Introducir Monto:</label>
                    <div className={style.inputBx}>
                        <input type="text" name="" id="" />
                        <span>SOP</span>
                    </div>
                </div>
                <button onClick = {() => SetLink(true)}>Generar Link</button>

                <div className={style.description}>
                    <span>Description: </span>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae possimus, non repellendus consequatur expedita dolorem dignissimos ullam hic cum illo quos reiciendis accusamus, ut voluptatibus libero, mollitia culpa. Placeat, nam?</p>
                </div>

                {link && <div className={style.linkDetails} data-aos="zoom-in-up">
                    <div className={style.imageBx} data-aos="zoom-in-up">
                        <Image src = "/assets/images/QR.png"
                        layout="fill"
                        objectFit="cover" // Ajusta la imagen para cubrir todo el contenedor
                        objectPosition="center"></Image>
                    </div>
                    <div className={style.details} data-aos="zoom-in-up">
                        <div className={style.detail}>
                            <span>Codigo: </span>
                            <span>UYGbiyui67532e61532</span>
                        </div>
                        <div className={style.detail}>
                            <span>Monto a pagar: </span>
                            <span>1000.00 OSP</span>
                        </div>
                        <div className={style.detail}>
                            <span>Estado: </span>
                            <span>No efectuado</span>
                        </div>

                    </div>

                </div>}
                

            </div>

        </div>

    </div>
    )
}