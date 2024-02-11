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
import Dialog from "./Dialog";
import DialogDonar from "./DialogDonar";
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import ErrorDialog from "./ErrorDialog";





export default function CardConfig({SetActive, closeAll, setRes, res}){

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

       /*const [res, setRes] = useState(() => {
        if (typeof window !== 'undefined') {
          return JSON.parse(sessionStorage.getItem('config')) || {};
          
        }
        return {};
      });*/
    



   const { user } = useContext(AuthContext);
   const { credential } = useContext(AuthContext);
   const [redirect,setRedirect] = useState(false)
   const [errorRes,SetErrorRes] = useState('')
   const [active,setActive] = useState(false)
   const [dialog,setDialog] = useState('')
   const [loading,setLoading] = useState(false)
   const [loadingDescount,setLoadingDescount] = useState(false)
   const [isChecked, setIsChecked] = useState(res.active);
   const [isMounted, setIsMounted] = useState(false);
   const [formValue,setFormValue]=useState({
    min_withdraw: res.min_withdraw
  });
console.log(res.min_withdraw)

   useEffect(() => { 
     AOS.init({
       duration:200
     });
     cardData()
     setIsMounted(true);
   }, []);

   useEffect(() => {
    setFormValue(prevValues => ({
      ...prevValues,
      min_withdraw: res.min_withdraw
    }));
  }, [res]);

   
/*-----PARA VISIBILIZAR EL ERROR DIALOG------*/
const [isObjectVisible, setIsObjectVisible] = useState(false);
const errorVisible = () => {
  setIsObjectVisible(true);
  setTimeout(() => {
      setIsObjectVisible(false);
  }, 3000);
}

/*------------------------INFORMACION DE LA TARJETA--------------------------- */
   const cardData = async () =>{
    const token = sessionStorage.getItem('access')
    console.log(token)
    
    try {
        const response = await axios.get('https://zona0.onrender.com/card/card-details/', { 
           headers: {
               'Authorization': 'Bearer ' + token
           }
         });
         console.log(response.data)
         /*setRes(response.data)*/
         console.log(response.data.active)

         if(response.data.active === true){
            setIsChecked(true)
         } else{
            setIsChecked(false)
         }
         // Guarda los datos actualizados en el almacenamiento local
         sessionStorage.setItem('config', JSON.stringify(response.data));
            
         // Actualiza el estado res con los datos de la respuesta
         setRes(response.data);
        console.log("resPetition",res )
 
       } catch(error) {
        console.log(error.response);
       }    
     }


     /*------------------------NUEVO CODIGO DE DESCUENTO--------------------------- */
     const descaountCode = async () =>{
        const token = sessionStorage.getItem('access')
        console.log(token)
        console.log("FormValue",formValue)
        setLoadingDescount(true)
        console.log("id", res.id)
        try {
            const response = await axios.put(`https://zona0.onrender.com/card/card-details/change_discount_code?id=${res.id}`,{}, { 
                headers: {
                    'Authorization': 'Bearer ' + token
                }
              });
              console.log(response.data)

            

            // Actualiza el valor de min_withdraw en sessionStorage
                let currentConfig = JSON.parse(sessionStorage.getItem('config'));
                currentConfig.discount_code = response.data.discount_code; // Suponiendo que la respuesta contiene el nuevo valor de min_withdraw
                sessionStorage.setItem('config', JSON.stringify(currentConfig));
                setRes(JSON.parse(sessionStorage.getItem('config')))

                SetErrorRes(`Se ha cambiado el codigo exitosamente`)
                errorVisible()
                setLoadingDescount(false)
           } catch(error) {
            console.log(error.response);
            setLoadingDescount(false)
            setActive(false)
            if(error.response.status === 400){
                SetErrorRes(error.response.data.amount)
              console.log("ERROR", error)
              errorVisible()
            }
            if(error.response.status === 500){
              SetErrorRes("Algo salio mal. Compruebe que escribio el codigo correctamente.")
              errorVisible()
            }
            if(error.response.status === 404){
                SetErrorRes(error.response.data.message)
              errorVisible()
            }
           }
           
  }



  /*------------------------NUEVO LIMITE DE EXTRACCION--------------------------- */
  const extractionLimit = async () =>{
    const token = sessionStorage.getItem('access')
    console.log(token)
    console.log("FormValue",formValue)
    console.log("id", res.id)
    try {
        const response = await axios.put(`https://zona0.onrender.com/card/card-details/min_withdraw_code?id=${res.id}`,formValue, { 
            headers: {
                'Authorization': 'Bearer ' + token
            }
          });
        console.log(response.data)
        

        // Actualiza el valor de min_withdraw en sessionStorage
        let currentConfig = JSON.parse(sessionStorage.getItem('config'));
        currentConfig.min_withdraw = response.data.min_withdraw; // Suponiendo que la respuesta contiene el nuevo valor de min_withdraw
        currentConfig.discount_code = response.data.discount_code; // Suponiendo que la respuesta contiene el nuevo valor de min_withdraw
        sessionStorage.setItem('config', JSON.stringify(currentConfig));
        setRes(JSON.parse(sessionStorage.getItem('config')))
        
        SetErrorRes(`Se ha establecido un nuevo limite de extraccion`)
        errorVisible()
        setDialog(false)
       } catch(error) {
        console.log(error.response);
        setDialog(false)
        if(error.response.status === 400){
          SetErrorRes(error.response.data.amount)
          console.log("ERROR", error)
          errorVisible()
        }
        if(error.response.status === 500){
          SetErrorRes("Algo salio mal. Compruebe que escribio el codigo correctamente.")
          errorVisible()
        }
        if(error.response.status === 404){
            SetErrorRes(error.response.data.message)
          errorVisible()
        }
       }
       
}
/*------------------------ACTIVAR LA TARJETA--------------------------- */
const activeCard = async () =>{
    const token = sessionStorage.getItem('access')
    console.log(token)
    console.log("FormValue",formValue)
    setLoading(true)
    console.log("id", res.id)
    try {
        const response = await axios.put(`https://zona0.onrender.com/card/card-details/active_code/?id=${res.id}`,{}, { 
            headers: {
                'Authorization': 'Bearer ' + token
            }
          });
        console.log(response.data)
        setLoading(false)

        // Actualiza el valor de min_withdraw en sessionStorage
        let currentConfig = JSON.parse(sessionStorage.getItem('config'));
        currentConfig.active = response.data.active; // Suponiendo que la respuesta contiene el nuevo valor de min_withdraw
        sessionStorage.setItem('config', JSON.stringify(currentConfig));
        setRes(JSON.parse(sessionStorage.getItem('config')))
        
        SetErrorRes(`Se ha activado la tarjeta`)
        errorVisible()
        setDialog(false)
       } catch(error) {
        console.log(error.response);

        if(error.response.status === 400){
            SetErrorRes(error.response.data.amount)
          console.log("ERROR", error)
          errorVisible()
        }
        if(error.response.status === 500){
          SetErrorRes("Algo salio mal. Compruebe que escribio el codigo correctamente.")
          errorVisible()
        }
        if(error.response.status === 404){
            SetErrorRes(error.response.data.message)
          errorVisible()
        }
       }
       
}



        /*------------------------DESACTIVAR LA TARJETA--------------------------- */
const desactiveCard = async () =>{
    const token = sessionStorage.getItem('access')
    console.log(token)
    console.log("FormValue",formValue)
    setLoading(true)
    console.log("id", res.id)
    try {
        const response = await axios.put(`https://zona0.onrender.com/card/card-details/desactive_code?id=${res.id}`,{}, { 
            headers: {
                'Authorization': 'Bearer ' + token
            }
          });
        console.log(response.data)
        setLoading(false)

        // Actualiza el valor de min_withdraw en sessionStorage
        let currentConfig = JSON.parse(sessionStorage.getItem('config'));
        currentConfig.active = response.data.active; // Suponiendo que la respuesta contiene el nuevo valor de min_withdraw
        sessionStorage.setItem('config', JSON.stringify(currentConfig));
        setRes(JSON.parse(sessionStorage.getItem('config')))
        

        SetErrorRes(`Se ha desactivado la tarjeta`)
        errorVisible()
        setDialog(false)
       } catch(error) {
        console.log(error.response);
        setLoading(false)
        setDialog(false)
        if(error.response.status === 400){
            SetErrorRes(error.response.data.amount)
          console.log("ERROR", error)
          errorVisible()
        }
        if(error.response.status === 500){
          SetErrorRes("Algo salio mal. Compruebe que escribio el codigo correctamente.")
          errorVisible()
        }
        if(error.response.status === 404){
            SetErrorRes(error.response.data.message)
          errorVisible()
        }
       }
       
      }
        if (!isMounted) {
            return null; // Or some placeholder content
           }

   return(
       <div className={style.cont} data-aos="fade-left" onClick = {() =>{
                                                   setResponse("");
                                                   closeAll}}>
                                                
          {dialog && 
                    <DialogDonar  SetActive ={setDialog}
                    fnc={extractionLimit}
                    setFormValue={setFormValue}
                    formValue={formValue}
                    loading={loading}
                    header = "Nuevo limite de extraccion" 
                    name = "min_withdraw"
                    value = {formValue.min_withdraw}/>
          }  
          {isObjectVisible && <div className="errorRequest" >
                         <ErrorDialog error = {errorRes} /> </div>}
                         
                         
           <div className={style.bx} onClick = {(event) => {event.stopPropagation()}}>
               <div className={style1.header}>
               
                   <div className={style.header1}>
                       <h2 className = {style1.iconH2} onClick = {() =>{
                           SetActive(false)} } ><IoIosArrowBack/></h2>
                       <h2>Gestionar Tarjeta</h2>
                   </div>
               </div>
               <div className={style.info}> 
                <div className={style.infoHeader}><span>Acerca de</span></div>
                <div className={style.list}>
                    <ul>
                        <li><span>Minimo diario a extraer</span><span>{res.min_withdraw}</span></li>
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
                                                activeCard()
                                                console.log("checked")
                                              } else {
                                                desactiveCard()
                                               console.log("not checked")
                                              }
                                            }} 
                                        />
                                    </div>
                                </ThemeProvider>
                            </span>
                        </li>
                        <li><span>Código de descuento</span><span>{res.discount_code}</span></li>
                    </ul>

                </div>

               </div>
                <div className={style.btnBx}>
                <div className={style.infoHeader}><span>Opciones</span></div>
                {loadingDescount  ? <div className={style.loader}>
                           <BeatLoader
                        color="rgba(255, 68, 0,1)"
                        cssOverride={{}}
                        margin={10}
                        size={10}
                        speedMultiplier={1}
                        /> </div> :
                        <div className={style.option} onClick = {descaountCode}>
                        <div className={style.icon}>{/*<IoIosLogOut/>*/}</div>
                        <div className={style.name} >Cambiar codigo de descuento</div>
                        <div className={style.icon1}>{/*<IoIosArrowForward/>*/}</div>
                    </div> }

                    
                    
                    <div className={style.option} onClick = {() => setDialog(true)} >
                        <div className={style.icon}>{/*<IoIosLogOut/>*/}</div>
                        <div className={style.name} >Cambiar limite de extraccion</div>
                        <div className={style.icon1}>{/*<IoIosArrowForward/>*/}</div>
                    </div>

                </div>
                



  
                   </div>

               </div>
   )
    
}