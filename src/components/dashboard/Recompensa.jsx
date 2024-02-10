"use client"
import style from "../../../public/assets/styles/Recompensa.module.css"
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useState, useEffect } from "react";
import axios from "axios"
import Regalo from "./Regalo";
import BeatLoader from "react-spinners/BeatLoader"

export default function Recompensa(){
    //states
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(false)
    const [active, SetActive] = useState(false)
    const [res, SetRes] = useState(null)
    const [error, SetError] = useState(null)
    const [formValue,setFormValue]=useState({
        code:''
      });

    
      //functions
      const handleChange= (event) => {
        setFormValue({
          ...formValue,
          [event.target.name]:event.target.value
        })
      }

      /*---------------------RECIBIR LA RECOMPENSA------------------- */
      const canjear = async () =>{
        const token = sessionStorage.getItem('access')
        console.log(token)
        console.log("Peticion")
        setLoading(true)
        console.log(formValue)
        try {
            const response = await axios.post('https://zona0.onrender.com/redeem-code/code/redeem/', formValue, { 
                headers: {
                    'Authorization': 'Bearer ' + token
                }
              });
            console.log(response);
            setLoading(false)
            SetActive(true)
            SetRes(response.data.message)
           } catch(error) {
            console.log(error.response);
            setLoading(false)

            if(error.response.status === 400){
              SetError(error.response.data.error)
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

    useEffect(() => {
        AOS.init({
          duration:2000
      });
      }, []);

    return(
        <div className="cont">
          {active && <Regalo header = {res}  SetActive = {SetActive}/>}
            <div className="content">
                <div className="header" data-aos="fade-up">
                  <div className="line"></div>
                  <h3>Canjear Codigo</h3> 
                </div>
                <div className="bx" data-aos="fade-up">
                  <div  className="contBx">
                    <div className="description">
                          <span>Entre el codigo:</span>
                          <p>Aqui podras canjear codigos que esten disponibles para obtener OSP de manera gratuita.</p>
                      </div>
                      <div className={style.input}>
                          <input type="text" 
                          name="code" id="" 
                          placeholder="Codigo"
                          value={formValue.code}
                          onChange={handleChange} />
                      </div>

                      {formValue.code === "" ? <button className="deseableBtn">Recibir Premio</button> :
                    loading  ? <div className="loader">
                       <BeatLoader
                    color="rgba(255, 68, 0,1)"
                    cssOverride={{}}
                    margin={10}
                    size={10}
                    speedMultiplier={1}
                  />
                    </div> : <button onClick = {canjear}>Recibir Premio</button>}
                  </div>
                  
                    {/*<div className={style.regalo}>
                        <Image src = "/assets/images/undraw_happy_birthday_re_c16u.svg"
                        width = {300}
                        height={300}></Image>
                        {isObjectVisible && <div className={style.error} >
                         <ErrorDialog error = {error} />
                      </div>}
                    </div>*/}
                    
                </div>
                
            </div>
        </div> 
    )
}