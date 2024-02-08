"use client"
import style from "../../public/assets/styles/DialogDonar.module.css"
import BeatLoader from "react-spinners/BeatLoader"
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from "react";
import axios from "axios"
import ErrorDialog from "./ErrorDialog";

export default function DialogDonar({SetActive, 
                                    fnc,
                                    setFormValue, 
                                    formValue, 
                                    loading,
                                    header,
                                    name ,
                                    value }){


      const handleChange= (event) => {
        setFormValue({
          ...formValue,
          [event.target.name]:event.target.value
        })
      }



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
                  {name === "amount" ?
                  <input type="text"
                  name = {name}
                  value={value}
                  onChange={handleChange}
                  onKeyDown={(event) => {
                    const keyCode = event.keyCode;
                    const isNumber = (keyCode >= 48 && keyCode <= 57);
                    const isBackspace = (keyCode === 8);
                    if (!isNumber && !isBackspace) {
                      event.preventDefault();
                    }
                  }} />: 
                  <input type="text"
                  name = {name}
                  value={value}
                  onChange={handleChange}
                   />
                }
                    
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