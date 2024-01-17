"use client"
import { useParams } from 'next/navigation';
import { BsQrCodeScan } from "react-icons/bs";
import { useEffect, useState } from 'react';
import style from "../../../public/assets/styles/Details.module.css"
import copyToClipboard from "../functions/copyToClipboard"
import QRCode from "react-qr-code";
import { IoMdCopy } from "react-icons/io";
import {VscClose} from "react-icons/vsc"


export default function Details({SetVisible, recibir}){




 return(

    <div className={style.cont} >

        <div className={style.content}>
            <div className={style.iconBx}>
                <VscClose className={style.iconClose} onClick = {() =>  SetVisible(false)}/> 
            </div>
                <div className={style.linkDetails} data-aos="zoom-in-up">
                            <div className={style.imageBx} data-aos="zoom-in-up">
                                <QRCode
                                     value={recibir.code}
                                     bgColor="#FFFFFF"
                                     fgColor="#000000"
                                     level="H"
                                     style={{ height: "auto", width: "100%" }}/> 
                            </div>
                            <div className={style.details} >
                            <div>
                                Detalles
                            </div>
                                <div className={style.detail}>
                                    <span className={style.name}>Codigo: </span>
                                    <span className={style.link}>
                                        <span className={style.code}>{ recibir.code}</span>
                                        <span className={style.icon} onClick={() => {copyToClipboard(recibir.code)}}><IoMdCopy/></span>
                                    </span>
                                </div>
                                <div className={style.detail}>
                                    <span>Monto a pagar: </span>
                                    <span>{ recibir.amount} OSP</span>
                                </div>
                                <div className={style.detail}>
                                    <span>Estado: </span>
                                    <span>No efectuado</span>
                                </div>
                                <div className={style.detail}>
                                    <span>{recibir.date}</span> <span>  </span>
                                    <span> {recibir.time}</span>
                                </div>
                                        
                            </div>          
                        </div>                  
                </div>
    </div>
   
 )
}
