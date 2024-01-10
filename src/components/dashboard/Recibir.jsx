"use client"

import style from "../../../public/assets/styles/Recibir.module.css"
import { BsQrCodeScan } from "react-icons/bs";
import { useState, useEffect } from "react";
import Image from "next/image"
import AOS from 'aos';
import 'aos/dist/aos.css';
import QRCode from "react-qr-code";
import { IoMdCopy } from "react-icons/io";
import copyToClipboard from "../functions/copyToClipboard"
import axios from "axios"
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import Link from "next/link"

export default function Recibir(){
        const { user } = useContext(AuthContext);
        const [link, SetLink] = useState(false)
        useEffect(() => {
            AOS.init({
              duration:1000
          });
          }, []);

          const [copyLink, setCopyLink] = useState("UYGbiyui67532e61532");

          const createLink = async () =>{
                const token = localStorage.getItem('access')
                console.log(token)
                console.log("Peticion")
                try {
                    const response = await axios.post('https://zona0.onrender.com/transfer/create-receive/', {amount: 30}, { 
                        headers: {
                            'Authorization': 'Bearer ' + token
                        }
                      });
                      

                    console.log(response);
                    SetLink(true);
                   } catch(error) {
                    console.log(error.response);
                   }
                   
          }

    return(
        user !== null ? <div className={style.cont}>
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
                <button onClick = {createLink}>Generar Link</button>

                <div className={style.description}>
                    <span>Description: </span>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae possimus, non repellendus consequatur expedita dolorem dignissimos ullam hic cum illo quos reiciendis accusamus, ut voluptatibus libero, mollitia culpa. Placeat, nam?</p>
                </div>
                    
                {link && <div className={style.linkDetails} data-aos="zoom-in-up">
                    <div className={style.imageBx} data-aos="zoom-in-up">
                        <QRCode
                             value="https://example.com"
                             bgColor="#FFFFFF"
                             fgColor="#000000"
                             level="H"
                             style={{ height: "auto", width: "100%" }}/> 
                    </div>
                    <div className={style.details} >
                        <div className={style.detail}>
                            <span className={style.name}>Codigo: </span>
                            <span className={style.link}>
                                <span>UYGbiyui67532e61532</span>
                                <span className={style.icon} onClick={() => copyToClipboard(copyLink)}><IoMdCopy/></span>
                            </span>
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
    </div>: <div className={style.cont1}>
          <Image src = "/assets/images/undraw_login_re_4vu2.svg" width = {300} height={300}></Image>
          <div className={style.subHeader}>
            Debe autenticarse primero
          </div>
          <Link href = "/accounts/login"><button>Autenticarse</button></Link>
        </div>
    )
}