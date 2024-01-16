"use client"
import style from "../../../public/assets/styles/Link.module.css"
import QRCode from "react-qr-code";
import copyToClipboard from "../functions/copyToClipboard"
import { IoMdCopy } from "react-icons/io";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import Details from "./Details";
import { FaRegTrashAlt } from "react-icons/fa";
import axios from "axios"


export default function Receive({res, key, SetVisible, counter, setSelected, setDialog}){
    const [copyLink, setCopyLink] = useState("");
    const router = useRouter();


     
    
    return(
        <div>
            <div className={style.reciboBx} key = {key} >

            <div className={style.detail} key = {key}>
                <div className={style.qr} key = {key} onClick = {() => {SetVisible(true)}}>
                    <QRCode
                        value={res.code}
                        bgColor="#FFFFFF"
                        fgColor="#000000"
                        level="H"
                        style={{ height: "auto", width: "100%" }}
                        /> 
                </div>
               
                <div className={style.detail2} key = {key}>
                <div className={style.date} key = {key}>
                    <span className={style.link} key = {key}>
                        <span className={style.code} key = {key}>{res.code}</span>
                        <span className={style.icon} key = {key}
                            onClick={() => {setCopyLink(res.code);
                            copyToClipboard(copyLink)}}><IoMdCopy/>
                        </span>
                    </span>        
                </div>

                    <div className={style.monto} key = {key}>
                        <span className={style.monto} key = {key}>Monto:</span> 
                        <span key = {key}>{res.amount} OSP</span>
                    </div>
                    <div className={style.ts} key = {key}>
                       {res.date}
                    </div>
                </div>
                

            </div>
            
            <div className={style.estatus}  key = {key}>
                {res.state}
            </div>
            <div  key = {key}>
                <FaRegTrashAlt className={style.iconTrash} onClick = {() => setDialog(true)}  key = {key}/>
            </div>

        </div>

        </div>
        
        
    )
}