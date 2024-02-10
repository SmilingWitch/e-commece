"use client"
import { useParams } from 'next/navigation';
import { BsQrCodeScan } from "react-icons/bs";
import { useEffect, useState } from 'react';
import style from "../../../public/assets/styles/Details.module.css"
import copyToClipboard from "../functions/copyToClipboard"
import QRCode from "react-qr-code";
import { IoMdCopy } from "react-icons/io";
import {VscClose} from "react-icons/vsc"
import axios from "axios"
import { FaRegTrashAlt } from "react-icons/fa";
import Dialog from '../Dialog';
import AOS from 'aos';
import 'aos/dist/aos.css';


export default function Details({SetVisible, recibir,SetCode}){

    //states
    const [resDelete, SetResDelete] = useState([])
    const [loading, setLoading] = useState(false)
    const [loadingDialod, setLoadingDialog] = useState(false)
    const [dialog, setDialog] = useState(false)

    
    //function
    const DeleteRecieves = async (id) =>{
        const token = sessionStorage.getItem('access')
        setLoading(true)
        console.log(token)
        console.log("Peticion")
        try {
            const response = await axios.delete(`https://zona0.onrender.com/transfer/list-delete-unpaid-receive/${id}`, { 
               headers: {
                   'Authorization': 'Bearer ' + token
               }
             });

            SetResDelete(response.data)
            console.log(response);
            setDialog(false)
            setLoading(false)
            SetVisible(false)

            // Obtén los datos del almacenamiento local
            let codigossessionStorage = JSON.parse(sessionStorage.getItem('pay')) || [];

            // Filtra los datos para excluir el elemento que deseas eliminar
            codigossessionStorage = codigossessionStorage.filter(codigo => codigo.id !== id);

            // Guarda los datos actualizados en el almacenamiento local
            sessionStorage.setItem('pay', JSON.stringify(codigossessionStorage));
            SetCode(codigossessionStorage);
            console.log("CODE", code);
            
           } catch(error) {
            console.log(error.response);
            setLoading(false)
            setDialog(false)
            SetVisible(false)

           }    
         }


    useEffect(() => {
       AOS.init({
         duration:250
     });
     }, []);


 return(
    <div className={style.cont} >
        {dialog && <Dialog header = "Borrar Codigo de Pago"
                                content = "Estas seguro que quieres borrar este Codigo de Pago?"
                                SetActive = {setDialog}
                                active = {dialog}
                                fnc = {() => DeleteRecieves(recibir.id)}
                                setLoading = {setLoadingDialog}
                                loading = {loadingDialod}/>}
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
                            <div className={style.headerDetail}>
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
                                    <span>{ recibir.state}</span>
                                </div>
                                <div className={style.detail}>
                                    <span>Fecha</span>
                                    <span>{recibir.date},{recibir.time}</span>
                                </div>
                                        
                            </div>  

                            {recibir.state === "Unpaid" ? 
                                <button onClick={() =>setDialog(true)}>
                                    <span><FaRegTrashAlt/></span>
                                    <span>Cancelar el recibo de pago</span>
                                </button>    
                            : ""}        
                        </div>                  
                </div>
    </div>
   
 )
}
