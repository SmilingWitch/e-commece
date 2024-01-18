"use client"
import style from "../../../public/assets/styles/Enviar.module.css"
import { BsQrCodeScan } from "react-icons/bs";
import Image from "next/image"
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import Link from "next/link"
import axios from "axios"
import {useState, useEffect} from "react"
import BeatLoader from "react-spinners/BeatLoader"
import ErrorDialog from "../ErrorDialog";
import AOS from 'aos';
import 'aos/dist/aos.css';
import Dialog from "../Dialog";



export default function Enviar(){

    const { user } = useContext(AuthContext);
    const [visible, SetVisible] = useState(false)
    const [loading,setLoading] = useState(false)
    const [error,SetError] = useState(false)
    const [resDetails,SetResDetails] = useState(false)
   
   


    let code = [];
    if (typeof window !== 'undefined') {
     code = JSON.parse(localStorage.getItem('pay')) || [];
    }
    const [codigo, setCodigo] = useState(code);


    const [formValue,setFormValue]=useState({
        code:''
      });
      const handleChange= (event) => {
        setFormValue({
          ...formValue,
          [event.target.name]:event.target.value
        })
      }
      /*-----PARA VISIBILIZAR EL ERROR DIALOG------*/
      const [isObjectVisible, setIsObjectVisible] = useState(false);
      const errorVisible = () => {
        setIsObjectVisible(true);
        setTimeout(() => {
            setIsObjectVisible(false);
        }, 3000);
     }

     useEffect(() => {
      AOS.init({
        duration:200
    });
    }, []);
     

    const send = async () =>{
        const token = sessionStorage.getItem('access')
        console.log(token)
        console.log("Peticion")
        setLoading(true)
        try {
            const response = await axios.post('https://zona0.onrender.com/transfer/create-sendTransfer/', {code: formValue.code}, { 
                headers: {
                    'Authorization': 'Bearer ' + token
                }
              });

              // Guardar la nueva información del código en el estado
                setCodigo(response.data);

                // Recuperar los datos existentes del localStorage
                let codigos = JSON.parse(localStorage.getItem('send')) || [];

                // Agregar el nuevo código al arreglo
                codigos.push(response.data);

                // Almacenar el arreglo actualizado en el localStorage
                localStorage.setItem('send', JSON.stringify(codigos));

              console.log("CODIGO",localStorage.getItem('send'))

              SetRes(response.data)
              console.log(response);
              SetVisible(false)

              setLoading(false)
             } catch(error) {
              console.log(error.response);
              if(error.response.status === 400){
                SetError(error.response.data.error)
                console.log("ERROR", error)
                errorVisible()
              }
              if(error.response.status === 500){
                SetError("Algo salio mal. Intentelo mas tarde!")
                errorVisible()
              }
              if(error.response.status === 404){
                SetError(error.response.data.message)
                errorVisible()
              }
              setLoading(false)
              SetVisible(false)
             }
           
        }




        const detailReceive = async () =>{
          const token = sessionStorage.getItem('access')
          console.log(token)
          console.log("Peticion")
          setLoading(true)
          try {
              const response = await axios.post('https://zona0.onrender.com/transfer/detail-receive/', {code: formValue.code}, { 
                  headers: {
                      'Authorization': 'Bearer ' + token
                  }
                });
  
  
                SetResDetails(response.data)
                console.log(response);
                SetVisible(true)
                setLoading(false)
               } catch(error) {
                console.log(error.response);
                if(error.response.status === 400){
                  SetError(error.response.data.error)
                  console.log("ERROR", error)
                  errorVisible()
                }
                if(error.response.status === 500){
                  SetError("Algo salio mal. Intentelo mas tarde!")
                  errorVisible()
                }
                if(error.response.status === 404){
                  SetError(error.response.data.message)
                  errorVisible()
                }
                setLoading(false)
               }
             
          }
          //65adedd8-a837-4889-b30e-04b60a11300c

    return(
         <div className={style.cont}>
              {visible && <Dialog header = "Enviar"
                                  content = {"Estas seguro de que quieres mandar " + resDetails.amount + " SOP al usuario " + "@"+ resDetails.user + " ?"}
                                  SetActive = {SetVisible}
                                  fnc = {send}
                                  loading = {loading} 
                                  setLoading={setLoading}/>}
          
            <div className={style.content}>
                <div className={style.header}>
                  <div className={style.line}></div>
                  <h3>Enviar OSP</h3> 
                </div>

                <div className={style.bx}>
                    <div className={style.description}>
                        <span>Entre el codigo:</span>
                        <p>Introduzca el codigo para proceder a pagar el monto establecido.</p>
                    </div>
                    <div className={style.input}>
                        <label >Introducir Codigo:</label>
                        <div className={style.inputBx}>
                            <input type="text" name="code" id="" value={formValue.code} onChange={handleChange} />
                            <span><BsQrCodeScan/></span>
                        </div>
                       
                    </div>
                    {/*<button>Verificar</button>*/}
                    {formValue.code === "" ? <button className={style.deseableBtn}>Verificar</button> :
                        loading  ? <div className={style.loader}>
                           <BeatLoader
                        color="rgba(255, 68, 0,1)"
                        cssOverride={{}}
                        margin={10}
                        size={10}
                        speedMultiplier={1}
                    />
                      </div> : <button onClick = {detailReceive}>Verificar</button>}
                      </div>
                      {isObjectVisible && <div className={style.error} >
                         <ErrorDialog error = {error} />
                      </div>}
            </div>
        </div> 
        
    )
}