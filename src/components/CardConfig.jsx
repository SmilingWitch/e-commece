"use client"
import style1 from "../../public/assets/styles/Cart.module.css"
import style from "../../public/assets/styles/CardConfig.module.css"
import style2 from "../../public/assets/styles/Login.module.css"
import { IoIosArrowBack } from "react-icons/io";
import {useState, useEffect} from "react"
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import axios from "axios"
import { FaRegCheckCircle } from "react-icons/fa";
import BeatLoader from "react-spinners/BeatLoader"
import AOS from 'aos';
import 'aos/dist/aos.css';
import Switch from '@mui/material/Switch';
import { createTheme, ThemeProvider } from '@mui/material/styles';






export default function CardConfig({SetActive, closeAll}){

    const label = { inputProps: { 'aria-label': 'Switch demo' } };

    const theme = createTheme({
        components: {
          MuiSwitch: {
            styleOverrides: {
              switchBase: {
                // Controla el color por defecto para el pulgar
                color: 'black',
              },
              colorPrimary: {
                // Controla el color cuando el interruptor está encendido
                '&.Mui-checked': {
                  color: '#f2ff00',
                },
              },
              track: {
                // Controla el color por defecto para la pista
                opacity: 0.2,
                backgroundColor: 'orangered',
                '.Mui-checked.Mui-checked + &': {
                  // Controla el color cuando el interruptor está encendido
                  opacity: 0.7,
                  backgroundColor: 'orangered',
                },
              },
            },
          },
        },
       });
    

   //Para poner visible/invisible la contrasena


   const [redirect,setRedirect] = useState(false)
   const [error,setError] = useState('')
   const [response,setResponse] = useState('')
   const [loading,setLoading] = useState(false)
   const [isChecked, setIsChecked] = useState(false);


   useEffect(() => { 
     AOS.init({
       duration:200
     });
   }, []);

   return(
       <div className={style.cont} data-aos="fade-left" onClick = {() =>{
                                                   setResponse("");
                                                   closeAll}}>
           <div className={style.bx} onClick = {(event) => {event.stopPropagation()}}>
               <div className={style1.header}>
               
                   <div className={style.header1}>
                       <h2 className = {style1.iconH2} onClick = {() =>{
                           setResponse("");
                           SetActive(false)} } ><IoIosArrowBack/></h2>
                       <h2>Mi tarjeta</h2>
                   </div>
               </div>
               <div className={style.info}> 
                <div className={style.infoHeader}><span>Acerca de</span></div>
                <div className={style.list}>
                    <ul>
                        <li><span>Minimo diario a extraer</span><span>0.00</span></li>
                        <li>
                            {isChecked ? 
                            <span>Tarjeta activa</span>:
                            <span>Tarjeta inactiva</span>
                            }
                            
                            <span><ThemeProvider theme={theme}>
                                    <div>
                                        <Switch 
                                            checked={isChecked} 
                                            onChange={(event) => {
                                              setIsChecked(event.target.checked);
                                              if (event.target.checked) {
                                                // Ejecuta la función cuando el Switch está encendido
                                                /*myFunction1();*/
                                                console.log("checked")
                                              } else {
                                                // Ejecuta otra función cuando el Switch está apagado
                                               /* myFunction2();*/
                                               console.log("not checked")
                                              }
                                            }} 
                                        />
                                    </div>
                                </ThemeProvider>
                            </span>
                        </li>
                        <li><span>Código de descuento</span><span>567856</span></li>
                    </ul>

                </div>

               </div>
                <div className={style.btnBx}>
                    <div className={style.option} >
                        <div className={style.icon}>{/*<IoIosLogOut/>*/}</div>
                        <div className={style.name} >Cambiar codigo de descuento</div>
                        <div className={style.icon1}>{/*<IoIosArrowForward/>*/}</div>
                    </div>
                    <div className={style.option} >
                        <div className={style.icon}>{/*<IoIosLogOut/>*/}</div>
                        <div className={style.name} >Cambiar limite de extraccion</div>
                        <div className={style.icon1}>{/*<IoIosArrowForward/>*/}</div>
                    </div>

                </div>
                



  
                   </div>

               </div>
   )
    
}