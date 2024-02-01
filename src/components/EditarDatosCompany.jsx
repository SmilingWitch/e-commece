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
import { IoIosArrowDown } from "react-icons/io";



export default function EditarDatosCompany({SetActiveEdit, closeAll}){

    const { credential } = useContext(AuthContext);
    const { updateCredential } = useContext(AuthContext);
    const [selectedFile, setSelectedFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(credential.image);
    const fileInput = useRef(null);
    const defaultImageUrl = "/assets/images/avatar.svg";
    const [loading, setLoading] = useState(false)
    const [error,SetError] = useState('')
    const [errorImg,SetErrorImg] = useState('')
    const [loadingImage, setLoadingImage] = useState(false)
    const [visible,setVisible] = useState(false)
    const options = ["Mipyme", "TCP", "Estatal"]
    const defaultOption = credential.type;
    const [selectedOption, setSelectedOption] = useState(defaultOption);

    

    const [formValue, setFormValue] = useState({
        username: credential.username || '',
        ci: credential.ci || '',
        name: credential.name || '',
        last_name: credential.last_name || '',
        movil: credential.movil || ''  ,
        company_code: credential.company_code || ''  ,
        type:  credential.type || ''  ,
        company_name:  credential.company_name || ''  ,

     });
     const [imageValue, setImageValue] = useState({
        image: credential.image || ''
     })

    useEffect(() => { 
        AOS.init({
          duration:200
        });
        setImageUrl(credential.image)
      }, []);

      

      const handleClick = (option) => {
        setSelectedOption(option);
        setFormValue(prevState => ({
            ...prevState,
            type: option
        }));
    };

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
            const response = await axios.put(`https://zona0.onrender.com/users/company-update/${id}/`,formValue, { 
                headers: {
                    'Authorization': 'Bearer ' + token
                }
              });

              console.log(response);
              /*SetResDetails(response.data)
              SetVisible(true)*/
              setLoading(false)

              // Obtiene el objeto credential actual del sessionStorage
                let updatedCredential = JSON.parse(sessionStorage.getItem('credential'));

                // Actualiza los campos relevantes de credential
                updatedCredential.username = formValue.username;
                updatedCredential.ci = formValue.ci;
                updatedCredential.name = formValue.name;
                updatedCredential.last_name = formValue.last_name;
                updatedCredential.movil = formValue.movil;

                // Guarda el objeto credential actualizado en el sessionStorage
                sessionStorage.setItem('credential', JSON.stringify(updatedCredential));

                // Llama a updateCredential para actualizar el estado local
                updateCredential(updatedCredential);


             } catch(error) {
              console.log(error.response);
              if(error.response.status === 400){
                SetError(error.response.data.errors)
                console.log("ERROR", error.response.data.errors)
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
             
             console.log(response.data.image)
             setImageUrl(response.data.image)
             SetErrorImg('')
             SetError('')

          } catch (error) {
             console.log(error.response);
             if (error.response.status === 400) {
               console.log("ERROR", error);
               SetErrorImg(error.response.data.image)
             }
            setLoadingImage(false);
          }
         }

         useEffect(() => {
          console.log("IMAGEN", imageUrl);
          // Obtiene el objeto credential actual del sessionStorage
          let credential = JSON.parse(sessionStorage.getItem('credential'));
  
          // Actualiza el valor de la imagen
          credential.image = imageUrl;
  
          // Guarda el objeto credential actualizado en el sessionStorage
          sessionStorage.setItem('credential', JSON.stringify(credential));
          
          console.log(credential)
          setImageUrl(imageUrl)
          updateCredential(credential)
          
         }, [imageUrl]);


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


                  {credential.image !== null ? (<Image
                                width={150}
                                height={150}  
                                src={imageUrl || defaultImageUrl} 
                                alt="Imagen seleccionada"  />):<Image
                                width={150}
                                height={150}  
                                src="/assets/images/imagenPorDefecto.png"
                                alt="Imagen seleccionada"  /> }
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
                {errorImg === '' ? "" : <div className={style.error}>{errorImg[0]}</div>}
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
                        <div className= {error.username ? `${style.errorHeader} ${style.label}` : `${style.label}`}>Usuario</div>
                        <div className={style.input}>
                            <input 
                            type="text" 
                            placeholder="Username"
                            name = "username"
                            value={formValue.username}
                            onChange={handleChange} />

                        </div>
                        {error.username === undefined ? "" : <div className={style.error}>{error.username[0]}</div>}
                        </div>

                        <div className={style.inputBx}>
                        <div className= {error.name ? `${style.errorHeader} ${style.label}` : `${style.label}`}>Nombre</div>
                        <div className={style.input}>
                            <input 
                            type="text" 
                            placeholder="Nombre"
                            name = "name"
                            value={formValue.name}
                            onChange={handleChange} />

                        </div>
                        {error.name === undefined ? "" : <div className={style.error}>{error.name[0]}</div>}
                        </div>

                        <div className={style.inputBx}>
                        <div className= {error.last_name ? `${style.errorHeader} ${style.label}` : `${style.label}`}>Apellidos</div>
                        <div className={style.input}>
                            <input 
                            type="text" 
                            placeholder="Apellidos"
                            name = "last_name"
                            value={formValue.last_name}
                            onChange={handleChange} />

                        </div>
                        {error.last_name === undefined ? "" : <div className={style.error}>{error.last_name[0]}</div>}
                        </div>

                        <div className={style.inputBx}>
                        <div className= {error.movil ? `${style.errorHeader} ${style.label}` : `${style.label}`}>Telefono</div>
                        <div className={style.input}>
                            <input 
                            type="tel" 
                            placeholder="Telefono"
                            name = "movil"
                            value={formValue.movil}
                            onChange={handleChange} />

                        </div>
                        {error.movil === undefined ? "" : <div className={style.error}>{error.movil[0]}</div>}
                        </div>

                        <div className={style.inputBx}>
                        <div className= {error.ci ? `${style.errorHeader} ${style.label}` : `${style.label}`}>Carnet de identidad</div>
                        <div className={style.input}>
                            <input 
                            type="text" 
                            placeholder="Carnet"
                            name = "ci"
                            value={formValue.ci}
                            onChange={handleChange} />

                        </div>
                        {error.ci === undefined ? "" : <div className={style.error}>{error.ci[0]}</div>}
                        </div>

                        <div className={style.inputBx}>
                        <div className= {error.company_code ? `${style.errorHeader} ${style.label}` : `${style.label}`}>Codigo de la compania</div>
                        <div className={style.input}>
                            <input 
                            type="text" 
                            placeholder="Codigo"
                            name = "company_code"
                            value={formValue.company_code}
                            onChange={handleChange} />

                        </div>
                        {error.company_code === undefined ? "" : <div className={style.error}>{error.company_code[0]}</div>}
                        </div>

                        <div className={style.inputBx}>
                        <div className= {error.type ? `${style.errorHeader} ${style.label}` : `${style.label}`}>Tipo de compania</div>
                        {/*<div className={style.input}>
                            <input 
                            type="text" 
                            placeholder="Tipo"
                            name = "type"
                            value={formValue.type}
                            onChange={handleChange} />

                </div>*/}

                          <div className={`${style.input} ${style.selectBx} `} onClick = {()=> setVisible(!visible)}>
                              <div className={style.selectedType}>{selectedOption}</div>
                              <div className={style.selectIcon} onClick = {()=> setVisible(!visible)}><IoIosArrowDown/></div>
                              </div>
                              {visible && <div className={style.select1}>
                                {options.map((option, index) => (
                                  <div key={index} onClick={() =>{ handleClick(option); setVisible(false)}} className={style.option}>
                                    {option}
                                  </div>
                                ))}

                          </div>}
                        {error.type === undefined ? "" : <div className={style.error}>{error.type[0]}</div>}
                        </div>

                        <div className={style.inputBx}>
                        <div className= {error.company_name ? `${style.errorHeader} ${style.label}` : `${style.label}`}>Nombre de la compania</div>
                        <div className={style.input}>
                            <input 
                            type="text" 
                            placeholder="Nombre de la compania"
                            name = "company_name"
                            value={formValue.company_name}
                            onChange={handleChange} />

                        </div>
                        {error.company_name === undefined ? "" : <div className={style.error}>{error.company_name[0]}</div>}
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