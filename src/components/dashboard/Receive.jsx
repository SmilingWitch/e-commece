"use client"
import style from "../../../public/assets/styles/Link.module.css"
import QRCode from "react-qr-code";
import copyToClipboard from "../functions/copyToClipboard"
import { IoMdCopy } from "react-icons/io";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import Details from "./Details";
import { FaRegTrashAlt } from "react-icons/fa";
import axios from "axios"


export default function Receive({res, id, SetVisible, counter, setSelected, setDialog}){
    const router = useRouter();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
       }, []);

       if (!isMounted) {
        return null; // Or some placeholder content
       }
    
    return(
        <div key = {id + 1}>
            <div className={style.reciboBx} key = {id + 2} >

            <div className={style.detail} key = {id + 3}>
                <div className={style.qr} key = {id + 4} onClick = {() => {SetVisible(true)}}>
                    <QRCode
                        value={res.code}
                        bgColor="#FFFFFF"
                        fgColor="#000000"
                        level="H"
                        style={{ height: "auto", width: "100%" }}
                        /> 
                </div>
               
                <div className={style.detail2} key = {id + 5}>
                <div className={style.date} key = {id + 6 }>
                    <span className={style.link} key = {id + 7}>
                        <span className={style.code} key = {id + 8}>{res.code}</span>
                        <span className={style.icon} key = {id + 9}
                            onClick={() => {copyToClipboard(res.code)}}><IoMdCopy/>
                        </span>
                    </span>        
                </div>

                    <div className={style.monto} key = {id + 10}>
                        <span className={style.monto} key = {id + 11}>Monto:</span> 
                        <span key = {id + 12}>{res.amount} OSP</span>
                    </div>
                    <div className={style.ts} key = {id + 13}>
                       {res.date} 
                    </div>
                </div>
                

            </div>
            
            <div className={style.estatus}  key = {id + 14}>
                {res.state}
            </div>
            <div  key = {id + 15}>
                <FaRegTrashAlt className={style.iconTrash} onClick = {() => setDialog(true)}  key = {id + 16}/>
            </div>

        </div>

        </div>
        
        
    )
}