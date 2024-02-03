"use client"
import style from "../../../public/assets/styles/Guardar.module.css"
import { PiInfoLight } from "react-icons/pi";
import axios from "axios";
import { useState, useEffect } from "react";
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import BeatLoader from "react-spinners/BeatLoader"


export default function DepositosCard({res, setResp,errorVisible, SetDepo, depo, setVisible}){

    const { credential } = useContext(AuthContext);
    const [loading,setLoading] = useState(false)

    useEffect(() => {
        // Este efecto se ejecutará cada vez que 'depo' cambie
        sessionStorage.setItem('deposit', JSON.stringify(depo));
        console.log("codigossessionStorage", depo);
        console.log("depo", depo);
      }, [depo]);

    /*------------RETIRAR------------- */
    const retirar = async () =>{
        const token = sessionStorage.getItem('access')
        console.log(token)
        console.log("Peticion")
        setLoading(true)
        console.log(token)
        try {
            const response = await axios.post(`https://zona0.onrender.com/banking/account/withdraw/?id=${res.id}`,{},{ 
                headers: {
                    'Authorization': 'Bearer ' + token
                }
              });
              console.log(response.data)

            let codigossessionStorage = JSON.parse(sessionStorage.getItem('deposit')) || [];

            let idToRemove = res.id; // Reemplaza esto con el ID que quieres eliminar
            let newArray = codigossessionStorage.filter(obj => obj.id !== idToRemove);
            console.log("newArray",newArray)
            sessionStorage.setItem('deposit', JSON.stringify(newArray));
            let updatedArray = JSON.parse(sessionStorage.getItem('deposit'));
            console.log("updatedArray", updatedArray);

            setLoading(false)
            errorVisible(JSON.parse(sessionStorage.getItem('deposit')))
            setResp(response.data.message)
            SetDepo(updatedArray)
           } catch(error) {
            console.log(error.response)
            setLoading(false)
           }
           
    }

    return(
        <div className={style.card}>
            <div className={style.info}>
                <div className={style.gain}><span>Ganancia mensual:</span> 3%</div>
                <div className={style.amount}><span>Monto inicial:</span> {res.amount} OSP</div>
                <div className={style.date}> {res.date}</div>
            </div>
            <div className={style.btnBx}>
                <div className={style.progreso}>
                    <button>{/*Progreso*/} {res.state} </button>
                    <div className={style.popUp}>
                        <PiInfoLight className={style.icon}/>
                        <div className={style.hover}>
                            ¡Podrás ver la cantidad de dinero que tendrás dentro de tres meses!

                        </div>
                        
                    </div>
                </div>
                
                {loading  ? <div className={style.loader}>
                           <BeatLoader
                        color="rgba(255, 68, 0,1)"
                        cssOverride={{}}
                        margin={10}
                        size={10}
                        speedMultiplier={1}
                        />
                    </div> : <button onClick={retirar}>Retirar</button>}
            </div>
            
            
        </div>
    )
}