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
    const { id } = useParams();
    const [productId, setProductId] = useState('');
    const [copyLink, setCopyLink] = useState("");


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
                                        <span className={style.icon} onClick={() => {setCopyLink( recibir.code);
                                                                                    copyToClipboard(copyLink)}}><IoMdCopy/></span>
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
                                        
                            </div>          
                        </div>                  
                </div>
    </div>
   
 )
}
