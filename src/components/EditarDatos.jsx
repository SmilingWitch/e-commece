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
import axios from "axios"
import BeatLoader from "react-spinners/BeatLoader"
import compress from 'browser-image-compression';
import ImageDialog from "./ImageDialog"


export default function EditarDatos({SetActiveEdit, closeAll}){

    const { credential } = useContext(AuthContext);
    const [selectedFile, setSelectedFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(credential.image);
    const fileInput = useRef(null);
    const defaultImageUrl = "/assets/images/avatar.svg";
    const [loading, setLoading] = useState(false)
    const [loadingImage, setLoadingImage] = useState(false)

    

    const [formValue, setFormValue] = useState({
        username: credential.username || '',
        ci: credential.ci || '',
        name: credential.name || '',
        last_name: credential.last_name || '',
        movil: credential.movil || ''  
     });
     const [imageValue, setImageValue] = useState({
        image: credential.image || ''
     })

    useEffect(() => { 
        AOS.init({
          duration:200
        });
      }, []);

      /*useEffect(() => {
        if (imageUrl !== credential.image) {
           // Aquí, actualizamos el contexto con la nueva imagen
           dispatch({ type: 'UPDATE_IMAGE', payload: imageUrl });
        }
       }, [imageUrl, credential]);*/

      const handleChange= (event) => {
        setFormValue({
          ...formValue,
          [event.target.name]:event.target.value
        })
      }

      const handleFileChange = (e) => {
        if (!e) {
          console.error('No event was passed to handleFileChange');
          return;
        }
        setSelectedFile(e.target.files[0]);
        setImageUrl(URL.createObjectURL(e.target.files[0]));
        setImageValue((prev) => ({
           ...prev,
           image: e.target.files[0],
        }));
       }
       
       /*async function handleImageUpload(e) {
        if (!e) {
          console.error('No event was passed to handleImageUpload');
          return;
        }
        const imageFile = e.target.files[0];
        const options = {
           maxSizeMB: 2, // Tamaño máximo de la imagen en MB
           maxWidthOrHeight: 1920, // Ancho/alto máximo de la imagen en píxeles
           useWebWorker: true, // Utiliza un trabajador web para la tarea de compresión, desacargando el hilo principal
        };
       
        try {
           const compressedFile = await compress(imageFile, options);
           setImageValue(compressedFile);
           updateImage();
        } catch (error) {
           console.log(error);
        }
       }*/


       /*-----------------UPDATE PERSONAL INFORMATION------------------- */

       const updateData = async (e) =>{
        if (!e) {
          console.error('No event was passed to updateData');
          return;
        }
        e.preventDefault();
        const token = sessionStorage.getItem('access')
        console.log(formValue)
        console.log(token)
        console.log("Peticion")
        setLoading(true)
        let id = credential.pk
        console.log("ID", id)
        try {
            const response = await axios.put(`https://zona0.onrender.com/users/client-update/${id}/`,formValue, { 
                headers: {
                    'Authorization': 'Bearer ' + token
                }
              });

              console.log(response);
              /*SetResDetails(response.data)
              SetVisible(true)*/
              setLoading(false)
              

              


             } catch(error) {
              console.log(error.response);
              if(error.response.status === 400){
                /*SetError(error.response.data.error)*/
                console.log("ERROR", error)
                /*errorVisible()*/
              }
              /*if(error.response.status === 500){
                SetError("Algo salio mal. Intentelo mas tarde!")
                errorVisible()
              }
              if(error.response.status === 404){
                SetError(error.response.data.message)
                errorVisible()
              }*/
              setLoading(false)
             }
           
        }
   

         /*-----------------UPDATE IMAGE------------------- */

       
        const updateImage = async (e) => {
          e.preventDefault();
          const token = sessionStorage.getItem('access');
          console.log(imageValue);
          console.log(token);
          console.log("Peticion");
          setLoadingImage(true);
          // Crear un nuevo objeto FormData
         const formData = new FormData();

         // Agregar la imagen al objeto FormData
         formData.append('image', imageValue.image);
          try {
             const response = await axios.put("https://zona0.onrender.com/accounts/update/image-user/", formData, {
               headers: {
                 'Authorization': 'Bearer ' + token
               }
             });
         
             console.log(response);
             setLoadingImage(false);
             setImageUrl(response.data.image)
             console.log(response.data.image)
             /*dispatch({ type: 'UPDATE_CREDENTIAL', payload: response.data.image });*/
             

          } catch (error) {
             console.log(error.response);
             if (error.response.status === 400) {
               console.log("ERROR", error);
             }
            setLoadingImage(false);
          }
         }


        /*------------------------COMPRIMIR LA IMAGEN---------------------- */
async function handleImageUpload(event) {
 const imageFile = event.target.files[0];
 const options = {
    maxSizeMB: 2, // Tamaño máximo de la imagen en MB
    maxWidthOrHeight: 1920, // Ancho/alto máximo de la imagen en píxeles
    useWebWorker: true,
 };

 try {
    const compressedFile = await compress(imageFile, options);
    setImageValue(compressedFile)
    updateImage()
 } catch (error) {
    console.log(error);
 }
}

   

    return(
        <div className={style.cont} onClick = {closeAll} data-aos="fade-left">
            <div className={style.bx} onClick = {(event) => {event.stopPropagation()}}>
                <div className={style2.header}>
                
                    <div className={style.header1}>
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
                {loadingImage ? 
                    <div className="sweet-loading">
                        <BeatLoader
                          color="rgba(255, 68, 0,1)"
                          cssOverride={{}}
                          margin={10}
                          size={10}
                          speedMultiplier={1}
                        />
                    </div>
                    :<button className={style.btn1} onClick={updateImage}>Actualizar imagen</button>}
                
               
                

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
                {loading ? 
                    <div className="sweet-loading">
                        <BeatLoader
                          color="rgba(255, 68, 0,1)"
                          cssOverride={{}}
                          margin={10}
                          size={10}
                          speedMultiplier={1}
                        />
                    </div>
                    :<button className={style.btn} onClick={updateData}>Actualizar</button>}
                    

                </form>
                    {/*error === '' ? "" : <div className={style.error}>{error}</div>*/}
                    
                   
                    
                </div>
   
                    </div>

                
 
    )
}