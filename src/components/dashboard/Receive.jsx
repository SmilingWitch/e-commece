"use client"
import style from "../../../public/assets/styles/Link.module.css"
import QRCode from "react-qr-code";
import copyToClipboard from "../functions/copyToClipboard"
import { IoMdCopy } from "react-icons/io";
import { useState } from "react";


export default function Receive({res}){
    const [copyLink, setCopyLink] = useState("");

    
    return(
        <div className={style.reciboBx}>
            
            <div className={style.detail}>
                <div className={style.qr}>
                    <QRCode
                        value={res.code}
                        bgColor="#FFFFFF"
                        fgColor="#000000"
                        level="H"
                        style={{ height: "auto", width: "100%" }}/> 
                </div>
               
                <div className={style.detail2}>
                <div className={style.date}>
                    <span className={style.link}>
                        <span className={style.code}>{res.code}</span>
                        <span className={style.icon} 
                            onClick={() => {setCopyLink(res.code);
                            copyToClipboard(copyLink)}}><IoMdCopy/>
                        </span>
                    </span>        
                </div>

                    <div className={style.monto}>
                        <span className={style.monto}>Monto:</span> 
                        <span>{res.amount} OSP</span>
                    </div>
                    <div className={style.ts}>
                       {res.date}
                    </div>
                </div>
                

            </div>
            
            <div className={style.estatus}>
                {res.state}
            </div>

        </div>
    )
}