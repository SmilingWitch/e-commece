"use client"
import style from "../../../public/assets/styles/Guardar.module.css"
import { PiInfoLight } from "react-icons/pi";
import axios from "axios";
import { useState, useEffect } from "react";
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import BeatLoader from "react-spinners/BeatLoader"


export default function DepositosCard({res,setVisible, setSelected}){

    const { credential } = useContext(AuthContext);
    

    return(
        <div className={style.card} >
            <div className={style.info}>
                <div className={style.date}> <span>{res.date}</span></div>
                <div className={style.gain}><span>Ganancia mensual</span> <span>3%</span></div>
                <div className={style.amount}><span>Monto inicial</span> <span>{res.amount} OSP</span></div>
                <div className={style.block}><span>Ganancia</span> <span>0.00 OSP</span></div>
                <div className={style.block}><span>Tiempo de bloqueo</span> <span>{res.date_banked} dia(s)</span></div>
                
            </div>
            <div className={style.btnBx}>
                {/*<div className={style.progreso}>
                    <button> {res.state} </button>
                    <div className={style.popUp}>
                        <PiInfoLight className={style.icon}/>
                        <div className={style.hover}>
                            ¡Podrás ver la cantidad de dinero que tendrás dentro de tres meses!

                        </div>
                        
    </div>
                </div>*/}
                
            <button onClick={() => {setVisible(true); setSelected(res.id);console.log(res.id)}}>Retirar</button>
            </div>
            
            
        </div>
    )
}