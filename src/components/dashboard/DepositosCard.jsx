"use client"
import style from "../../../public/assets/styles/Guardar.module.css"
import { PiInfoLight } from "react-icons/pi";


export default function DepositosCard({res}){
    return(
        <div className={style.card}>
            <div className={style.info}>
                <div className={style.gain}><span>Ganancia mensual:</span> 3%</div>
                <div className={style.amount}><span>Monto actual:</span> {res.amount} OSP</div>
                <div className={style.date}> {res.date}</div>
            </div>
            <div className={style.btnBx}>
                <div className={style.progreso}>
                    <button>Progreso</button>
                    <div className={style.popUp}>
                        <PiInfoLight className={style.icon}/>
                        <div className={style.hover}>
                            ¡Podrás ver la cantidad de dinero que tendrás dentro de tres meses!

                        </div>
                        
                    </div>
                </div>
                
                <button>Retirar</button>
            </div>
            
            
        </div>
    )
}