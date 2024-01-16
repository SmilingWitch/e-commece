"use client"
import style from "../../../public/assets/styles/Enviar.module.css"
import { BsQrCodeScan } from "react-icons/bs";
import Image from "next/image"
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import Link from "next/link"
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Enviar(){

    const { user } = useContext(AuthContext);

    return(
         <div className={style.cont}>
            <div className={style.content}>
                <div className={style.header}>
                  <div className={style.line}></div>
                  <h3>Enviar OSP</h3> 
                </div>

                <div className={style.bx}>
                    <div className={style.input}>
                        <label >Introducir Codigo:</label>
                        <div className={style.inputBx}>
                            <input type="text" name="" id="" />
                            <span><BsQrCodeScan/></span>
                        </div>
                       
                    </div>
                    <button>Verificar</button>
                    <div>
                        <div className={style.imageBx}>
                            <Image src = "/assets/images/undraw_transfer_money_re_6o1h.svg"
                            layout="fill"
                            objectFit="contain" // Ajusta la imagen para cubrir todo el contenedor
                            objectPosition="center"></Image>
                        </div>

                    </div>
                </div>
            </div>
        </div> 
        
    )
}