"use client"

import style from "../../../public/assets/styles/Calculadora.module.css"
import BeatLoader from "react-spinners/BeatLoader"
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from "react";
import {VscClose} from "react-icons/vsc"


export default function Calculadora({SetVisible}){
    
    useEffect(() => {
        AOS.init({
          duration:200
      });
      }, []);


      /*const handleChange= (event) => {
        setFormValue({
          [event.target.name]:event.target.value
        })
      }*/



      const [formValue, setFormValue] = useState({
        amount: 0,
        days: 0
      });
    
      const [result, setResult] = useState(0);
      const [gain, setGain] = useState(0);
    
      const handleChange = (event) => {
        const { name, value } = event.target;
    
        // Comprueba si el valor ingresado es un número válido
        if (!isNaN(value)) {
          setFormValue(prevState => ({ ...prevState, [name]: value }));
        }
      };
    
      useEffect(() => {
        const amount = parseFloat(formValue.amount);
        const days = parseFloat(formValue.days);
    
        if (!isNaN(amount) && !isNaN(days)) {
            if (days < 30) {
                setResult(0)
            }
            else{
                setResult(((amount * (days/30) * (3/100)) + amount));
                setGain(((amount * (days/30) * (3/100)) ))
            }

          
          
        } else {
          setResult(0);
        }
      }, [formValue]);
console.log(result)



    
    return(
        <div className={style.cont} onClick = {(event) => {event.stopPropagation()}}>
            <div className={style.bx} data-aos="zoom-in">
            <div className={style.iconBx}>
                <VscClose className={style.iconClose} onClick = {() =>  SetVisible(false)}/> 
            </div>
                <div className={style.answer}>
                    <div className={style.calc}><span>Monto total</span><span>{result}</span></div>
                    <div className={style.calc}><span>Ganancia</span><span>{gain}</span></div>
                </div>
                <div className={style.inputsBx}>
                    <div className={style.input}>
                        <span>Dias</span>
                        <input 
                            type="text" 
                            name="days" 
                            id="" 
                            value={formValue.days}
                            onChange={handleChange}
                            onKeyDown={(event) => {
                            const keyCode = event.keyCode;
                            const isNumber = (keyCode >= 48 && keyCode <= 57);
                            const isBackspace = (keyCode === 8);
                            if (!isNumber && !isBackspace) {
                              event.preventDefault();
                            }
                          }}/>
                    </div>
                    <div className={style.input}>
                        <span>Monto</span>
                        <input 
                            type="text" 
                            name="amount" 
                            id=""
                            value={formValue.amount}
                            onChange={handleChange}
                            onKeyDown={(event) => {
                                const keyCode = event.keyCode;
                                const isNumber = (keyCode >= 48 && keyCode <= 57);
                                const isBackspace = (keyCode === 8);
                                if (!isNumber && !isBackspace) {
                                  event.preventDefault();
                                }
                              }} />
                    </div>

                </div>
                

            </div>
            
        </div>
    )
}