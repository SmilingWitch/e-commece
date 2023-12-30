"use client"
import style from "../../public/assets/styles/MyAccount.module.css"
import style1 from "../../public/assets/styles/Cart.module.css"
import Image from "next/image"
import { MdOutlineModeEdit } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import { LiaExchangeAltSolid } from "react-icons/lia";
import { IoIosLogOut } from "react-icons/io";
import { FaRegTrashAlt } from "react-icons/fa";
import {VscClose} from "react-icons/vsc"
import Switch from '@mui/material/Switch';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FiMoon } from "react-icons/fi";
import { IoSunnyOutline } from "react-icons/io5";
import { IoMoonOutline } from "react-icons/io5";
import { useState } from "react";

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


export default function MyAccount({SetMyAccount}) {

    const [isChecked, setIsChecked] = useState(false);


    return(
        <div className={style.cont} onClick = {() => SetMyAccount(false)}>
            <div className={style.bx} onClick = {(event) => {event.stopPropagation();}}>
                <div className={style1.header}>
                    <div className={style1.header1}>
                        <h2>Mi Perfil</h2>
                    </div>
                    <div>
                       <VscClose className={style.icon} onClick = {() => SetCart(false)}/> 
                    </div>
                </div>

                <div className={style.optionsBx}>
                    <div className={style.insertPhoto}>
                        <div className={style.selectedImageBx}>
                            <Image
                            width={110}
                            height={110} 
                            src="/assets/images/imagenPorDefecto.png" alt="Imagen seleccionada" />
                        </div>
                    </div>
                    <div className={style.option}>
                        <div className={style.icon}><MdOutlineModeEdit/></div>
                        <div className={style.name}>Editar datos</div>
                        <div className={style.icon1}><IoIosArrowForward/></div>
                    </div>
                    <div className={style.option}>
                        <div className={style.icon}><LiaExchangeAltSolid/></div>
                        <div className={style.name}>Cambiar la contrasena</div>
                        <div className={style.icon1}><IoIosArrowForward/></div>
                    </div>
                    <div className={style.option}>
                        <div className={style.icon}><IoIosLogOut/></div>
                        <div className={style.name}>Cerrar sesion</div>
                        <div className={style.icon1}><IoIosArrowForward/></div>
                    </div>
                    <div className={style.option}>
                        <div className={style.icon}><FaRegTrashAlt /></div>
                        <div className={style.name}>Eliminar cuenta</div>
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
                        
                    <ThemeProvider theme={theme}>
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