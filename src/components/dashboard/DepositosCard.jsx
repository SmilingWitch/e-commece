"use client"
import style from "../../../public/assets/styles/Guardar.module.css"
import { useState, useEffect } from "react";
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';


export default function DepositosCard({res,setVisible, setSelected}){

    const { credential } = useContext(AuthContext);
    const [calc, SetCalc] = useState()

    
    useEffect(() => { 
        if (res.date_banked >= 30 && res.date_banked %  30 ===  0){
            SetCalc(((res.amount * (res.date_banked/30) * (3/100)) + res.amount))
        } else{
            SetCalc(res.amount)
        }
        
      }, []);

    return(
        <div className={style.card} >
            <div className={style.info}>
                <div className={style.date}> <span>{res.date}</span></div>
                <div className={style.gain}><span>Ganancia mensual</span> <span>3%</span></div>
                <div className={style.amount}><span>Monto inicial</span> <span>{res.amount} OSP</span></div>
                <div className={style.block}><span>Monto actual</span> <span>{calc} OSP</span></div>
                <div className={style.block}><span>Proxima ganancia</span> <span>{res.post_interest} OSP</span></div>
                <div className={style.block}><span>Tiempo de bloqueo</span> <span>{res.date_banked} dia(s)</span></div>
                
            </div>
            <div className={style.btnBx}>
             {res.date_banked > 60 ?  
            <button onClick={() => {setVisible(true); setSelected(res.id);console.log(res.id)}}>Retirar</button> :
            <button className={style.deseableBtn}>Retirar</button>
            }
            </div>
            
            
        </div>
    )
}