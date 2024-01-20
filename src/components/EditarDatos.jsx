"use client"

import style2 from "../../public/assets/styles/Cart.module.css"
import style from "../../public/assets/styles/EditarDatos.module.css"
import style1 from "../../public/assets/styles/ChangePassword.module.css"
import {VscClose} from "react-icons/vsc"
import { IoIosArrowBack } from "react-icons/io";
import { useEffect,useState, useRef } from "react";
import Image from "next/image"
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { BiImageAdd } from "react-icons/bi";


export default function EditarDatos({SetActiveEdit, closeAll}){

    const { credential } = useContext(AuthContext);
    const [selectedFile, setSelectedFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(credential.image);
    const fileInput = useRef(null);
    const defaultImageUrl = "/assets/images/avatar.svg";

    const [formValue, setFormValue] = useState({
        username: credential.username || '',
        password: credential.password || '',
        email: credential.email || '',
        ci: credential.ci || '',
        name: credential.name || '',
        last_name: credential.last_name || '',
        movil: credential.movil || '',
        image: credential.image || ''
     });

    useEffect(() => { 
        AOS.init({
          duration:200
        });
      }, []);

      const handleChange= (event) => {
        setFormValue({
          ...formValue,
          [event.target.name]:event.target.value
        })
      }

      const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
        setImageUrl(URL.createObjectURL(e.target.files[0]));
   
        setFormValue((prev) => ({
           ...prev,
           image: e.target.files[0],
         }));
   
       }
   

    return(
        <div className={style1.cont} onClick = {closeAll} data-aos="fade-left">

            <div className={style1.bx} onClick = {(event) => {event.stopPropagation()}}>
                <div className={style2.header}>
                
                    <div className={style1.header1}>
                        <h2 className = {style2.iconH2} onClick = {() =>SetActiveEdit(false) } ><IoIosArrowBack/></h2>
                        <h2>Editar Datos</h2>
                    </div>
                </div>
             <div className={style.imageBx}>
                <div className={style.image}>
                    <Image
                    width={150}
                    height={150} 
                    src={imageUrl || defaultImageUrl}  alt="Imagen seleccionada" />
                </div>
                <div className={style.iconBx}>
                <input
                     type='file'
                     name='image'
                     ref={fileInput}
                     onChange={handleFileChange}
                     style={{ display: 'none' }}
                    />
                    <BiImageAdd className={style.imageIcon} onClick={() => fileInput.current.click()}/>
                </div>
                    
                </div>
                

                <form className={style.form}>
                    <div className={style.datos}>Datos personales</div>
                    <div className={style.inputBx}>
                        <div className={style.label}>Usuario</div>
                        <div className={style.input}>
                            <input 
                            type="text" 
                            placeholder="Username"
                            name = "username"
                            value={formValue.username}
                            onChange={handleChange} />

                        </div>

                        <div className={style.inputBx}>
                        <div className={style.label}>Nombre</div>
                        <div className={style.input}>
                            <input 
                            type="text" 
                            placeholder="Nombre"
                            name = "name"
                            value={formValue.name}
                            onChange={handleChange} />

                        </div>
                        </div>

                        <div className={style.inputBx}>
                        <div className={style.label}>Apellidos</div>
                        <div className={style.input}>
                            <input 
                            type="text" 
                            placeholder="Apellidos"
                            name = "last_name"
                            value={formValue.last_name}
                            onChange={handleChange} />

                        </div>
                        </div>

                        <div className={style.inputBx}>
                        <div className={style.label}>Telefono</div>
                        <div className={style.input}>
                            <input 
                            type="tel" 
                            placeholder="Telefono"
                            name = "movil"
                            value={formValue.movil}
                            onChange={handleChange} />

                        </div>
                        </div>

                        <div className={style.inputBx}>
                        <div className={style.label}>Carnet de identidad</div>
                        <div className={style.input}>
                            <input 
                            type="text" 
                            placeholder="Carnet"
                            name = "ci"
                            value={formValue.ci}
                            onChange={handleChange} />

                        </div>
                        </div>

                </div>
                <button className={style.btn}>Actualizar</button>



                </form>
                    {/*error === '' ? "" : <div className={style.error}>{error}</div>*/}
                   
                    
                </div>
   
                    </div>

                
 
    )
}