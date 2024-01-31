"use client"
import style from "../../public/assets/styles/DialogDonar.module.css"
import BeatLoader from "react-spinners/BeatLoader"
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from "react";
import axios from "axios"
import ErrorDialog from "./ErrorDialog";

export default function DialogDonar({SetActive, institution, user,SetAmount}){
    const [loading, setLoading] = useState(false)
    const [error, SetError] = useState(null)
    const [formValue,setFormValue]=useState({
        amount:'',
        user: user,
        institution: institution
      });

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

      /*-----PARA VISIBILIZAR EL ERROR DIALOG------*/
      const [isObjectVisible, setIsObjectVisible] = useState(false);
      const errorVisible = () => {
        setIsObjectVisible(true);
        setTimeout(() => {
            setIsObjectVisible(false);
        }, 3000);
     }




      const donate = async () =>{
        const token = sessionStorage.getItem('access')
        console.log(token)
        console.log(formValue)
        setLoading(true)
        try {
            const response = await axios.post('https://zona0.onrender.com/institutions/donations/', formValue, { 
                headers: {
                    'Authorization': 'Bearer ' + token
                }
              });
              console.log(response.data)
              SetAmount(formValue.amount)
            setLoading(false)
            SetActive(false)
           } catch(error) {
            console.log(error.response);
            setLoading(false)
            if(error.response.status === 400){
              SetError(error.response.data.amount)
              console.log("ERROR", error)
              errorVisible()
            }
            if(error.response.status === 500){
              SetError("Algo salio mal. Compruebe que escribio el codigo correctamente.")
              errorVisible()
            }
            if(error.response.status === 404){
              SetError(error.response.data.message)
              errorVisible()
            }
           }
           
  }


    return(
        <div className={style.cont} onClick = {(event) => {event.stopPropagation()}}>
          
            <div className={style.bx} data-aos="zoom-in">
            {isObjectVisible && <div className={style.error} >
                         <ErrorDialog error = {error} />
                      </div>}
                <div className={style.header}>
                   Monto a donar
                </div>
                <div className={style.content}>
                    <input type="text"
                    placeholder="0.00"
                    name = "amount"
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
                {loading === false ? <div className={style.btnBx}>
                    
                    <button onClick = {() => SetActive(false)} className={style.cancel}>Cancelar</button>
                    <button onClick = {donate}>Aceptar</button>
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