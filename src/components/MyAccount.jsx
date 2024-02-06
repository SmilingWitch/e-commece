"use client"
import style from "../../public/assets/styles/MyAccount.module.css"
import style1 from "../../public/assets/styles/Cart.module.css"
import Image from "next/image"
import { MdOutlineModeEdit } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import { LiaExchangeAltSolid } from "react-icons/lia";
import { IoIosLogOut } from "react-icons/io";
import {VscClose} from "react-icons/vsc"
import Switch from '@mui/material/Switch';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { IoSunnyOutline } from "react-icons/io5";
import { IoMoonOutline } from "react-icons/io5";
import Dialog from "./Dialog";
import{ useContext, useState, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import EditarDatos from "./EditarDatos";
import ChangePassword from "./ChangePassword";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaRegCreditCard } from "react-icons/fa";
import EditarDatosCompany from "./EditarDatosCompany";
import CardConfig from "./CardConfig";




    export default function MyAccount({SetMyAccount}) {

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

        const [link, SetLink] = useState(false)
        
        useEffect(() => {
            AOS.init({
              duration:200
          });
          }, []);

    const [loading,setLoading] = useState(false)    
    const { signOut } = useContext(AuthContext);
    const [isChecked, setIsChecked] = useState(false);
    const [active, SetActive] = useState(false);
    const [activeCard, SetActiveCard] = useState(false);
    const [activeEdit, SetActiveEdit] = useState(false);
    const [activeEditComapany, SetActiveEditComapany] = useState(false);
    const [activechangePass, SetActivechangePass] = useState(false);
    const { credential } = useContext(AuthContext);

    console.log(credential)
    console.log(active)

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("ACTIVE")
        setLoading(true)
        try{
          
          const res = await signOut();
          /*setError('');*/
          console.log(res)
        }catch(error){
          console.log(error)
        }
       }
       console.log(credential.type)
    const edit = () => {
        if(credential.user_type === "company"){
            SetActiveEditComapany(true)
        }
        if(credential.user_type === "client"){
            SetActiveEdit(true)
        }
    }

    const closeAll = () => {
        SetActiveEdit(false)
        SetActivechangePass(false)
    }

    

    return(
        <div className={style.cont} onClick = {() => SetMyAccount(false)} >
            
            {activeEdit && (<EditarDatos 
                                SetActiveEdit = {SetActiveEdit}
                                closeAll = {closeAll}
                                />)}
            {activeEditComapany &&  <EditarDatosCompany
                                SetActiveEdit = {SetActiveEditComapany}
                                closeAll = {closeAll}/>}
            {activechangePass &&<ChangePassword 
                                SetActivechangePass = {SetActivechangePass}
                                closeAll = {closeAll}/>}
            {active  === true ? <Dialog header = "Cerrar Sesion" 
                        content = "Estas seguro de que quieres cerrar sesion"
                        active = {active}
                        SetActive = {SetActive} 
                        fnc = {handleSubmit}
                        loading = {loading}
                        setLoading = {setLoading}/>: ""}
                        
            {activeCard  === true ? <CardConfig 
                                        SetActive = {SetActiveCard}/> : ""}
                
            <div className={style.bx} onClick = {(event) => {event.stopPropagation()}} data-aos="fade-left">
                
                <div className={style1.header}>
                
                    <div className={style1.header1}>
                        <h2>Mi Perfil</h2>
                    </div>
                    <div className={style.trash}>
                       <VscClose className={style1.icon} onClick = {() =>  SetMyAccount(false)}/> 
                    </div>
                </div>

                <div className={style.optionsBx}>
                    <div className={style.insertPhoto}>
                        <div className={style.selectedImageBx}>
                            {credential.image !== null ? (<Image
                                width={110}
                                height={110}  
                                src={credential.image} 
                                alt="Imagen seleccionada"  />):<Image
                                width={110}
                                height={110}  
                                src="/assets/images/imagenPorDefecto.png"
                                alt="Imagen seleccionada"  /> }
                                
                        </div>
                        <div className={style.info}>
                            <div className={style.name}>
                            {credential && (<span>{credential.name}</span>)}
                                <span> </span>
                            {credential && (<span>{credential.last_name}</span>)}
                            </div>
                            {credential && (<div className={style.userName}>
                                {credential.username}
                            </div>)}

                        </div>
                    </div>
                    <div className={style.option} onClick={edit}>
                        <div className={style.icon}><MdOutlineModeEdit/></div>
                        <div className={style.name}>Editar datos</div>
                        <div className={style.icon1}><IoIosArrowForward/></div>                        
                    </div>
                    <div className={style.option} onClick={() => SetActivechangePass(true)}>
                        <div className={style.icon}><LiaExchangeAltSolid/></div>
                        <div className={style.name}>Cambiar la contrasena</div>
                        <div className={style.icon1}><IoIosArrowForward/></div>
                    </div>
                    <div className={style.option} onClick = {() => SetActive(true)}>
                        <div className={style.icon}><IoIosLogOut/></div>
                        <div className={style.name} >Cerrar sesion</div>
                        <div className={style.icon1}><IoIosArrowForward/></div>
                    </div>
                    {/*<div className={style.option}>
                        <div className={style.icon}><FaRegTrashAlt /></div>
                        <div className={style.name}>Eliminar cuenta</div>
                        <div className={style.icon1}><IoIosArrowForward/></div>
                        </div>*/}
                    <div className={style.option} onClick = {() => SetActiveCard(true)}>
                        <div className={style.icon}><FaRegCreditCard /></div>
                        <div className={style.name}>Gestion de tarjetas</div>
                        <div className={style.icon1}><IoIosArrowForward/></div>
                    </div>
                </div>

                <div className={style1.header}>
                    <div className={style1.header1}>
                        <h2>Ajustes</h2>
                    </div>
                </div>

                <div className={style.ajustes}>
                    <div className={style.ajustOptions}>
                    {isChecked ? 
                        <div className={style.iconAj}>
                            <IoMoonOutline/>
                        </div>:
                        <div className={style.iconAj}>
                            <IoSunnyOutline/>
                        </div> 
                    }
                        
                        {isChecked ? 
                            <div className={style.text}>
                                <span>Modo oscuro</span>
                                <span>Cambiar a modo claro</span>
                            </div>:
                            <div className={style.text}>
                                <span>Modo claro</span>
                                <span>Cambiar a modo oscuro</span>
                            </div>
                        }
                        
                    <ThemeProvider theme = {theme}>
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
                    </div>

                </div>

            </div>
                

            </div>
        
    )
}