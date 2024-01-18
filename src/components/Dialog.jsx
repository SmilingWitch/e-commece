"use client"

import style from "../../public/assets/styles/Dialog.module.css"
import BeatLoader from "react-spinners/BeatLoader"
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";

export default function Dialog({header, content,SetActive,fnc, loading, setLoading}){
    
    useEffect(() => {
        AOS.init({
          duration:200
      });
      }, []);
    
    return(
        <div className={style.cont} onClick = {(event) => {event.stopPropagation()}}>
            <div className={style.bx} data-aos="zoom-in">
                <div className={style.header}>
                    {header}
                </div>
                <div className={style.content}>
                    {content}
                </div>
                {loading === false ? <div className={style.btnBx}>
                    
                    <button onClick = {() => SetActive(false)} className={style.cancel}>Cancelar</button>
                    <button onClick = {fnc}>Aceptar</button>
                </div>: <div className={style.centerLoader}>
                    <div className="sweet-loading">
                          <BeatLoader
                            color="rgba(255, 68, 0,1)"
                            cssOverride={{}}
                            margin={10}
                            size={10}
                            speedMultiplier={1}
                          />
                        </div>
                </div>
                }

            </div>
            
        </div>
    )
}