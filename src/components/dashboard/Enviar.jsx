"use client"
import style from "../../../public/assets/styles/Enviar.module.css"
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import axios from "axios"
import {useState, useEffect} from "react"
import BeatLoader from "react-spinners/BeatLoader"
import ErrorDialog from "../ErrorDialog";
import AOS from 'aos';
import 'aos/dist/aos.css';
import Dialog from "../Dialog";


export default function Enviar(){
    const { user } = useContext(AuthContext);

    // variables
    let code = [];
    if (typeof window !== 'undefined') {
     code = JSON.parse(sessionStorage.getItem('pay')) || [];
    }

    //states
    const [visible, SetVisible] = useState(false)
    const [loading,setLoading] = useState(false)
    const [error,SetError] = useState(false)
    const [resDetails,SetResDetails] = useState(false)
    const [codigo, setCodigo] = useState(code);

    // functions
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
        duration:2000
    });
    }, []);
     


    /*-----------------PETICION DE ENVIO--------------*/
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
              // Recuperar los datos existentes del sessionStorage
              let codigos = JSON.parse(sessionStorage.getItem('send')) || [];
              // Agregar el nuevo código al arreglo
              codigos.push(response.data);
              // Almacenar el arreglo actualizado en el sessionStorage
              sessionStorage.setItem('send', JSON.stringify(codigos));

              console.log("CODIGO",sessionStorage.getItem('send'))
              SetRes(response.data)
              console.log(response);
              SetVisible(false)
              setLoading(false)
              SetError("Se ha realizado el envio")
              errorVisible()

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

    /*-----------------DETALLES DEL RECIBO--------------*/
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
                if(error.response){
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
                }
                setLoading(false)
               }
          }


         
    return(
         <div className="cont">
              {visible && <Dialog header = "Enviar"
                                  content = {"Estas seguro de que quieres mandar " + resDetails.amount + " SOP al usuario " + "@"+ resDetails.user + " ?"}
                                  SetActive = {SetVisible}
                                  fnc = {send}
                                  loading = {loading} 
                                  setLoading={setLoading}/>}
            <div className="content">
              {isObjectVisible && <div className="errorRequest" >
                         <ErrorDialog error = {error} /> </div>}
                <div className="header" data-aos="fade-up">
                  <div className="line"></div>
                  <h3>Enviar OSP</h3> 
                </div>

                <div className="bx" data-aos="fade-up">
                  <div className="contBx">
                    <div className="description" >
                          <span>Entre el codigo:</span>
                          <p>Introduzca el codigo para proceder a pagar el monto establecido.</p>
                      </div>
                      <div className={style.input}>
                          <div className={style.inputBx}>
                              <input type="text" 
                                      name="code" 
                                      id=""
                                      placeholder="Codigo"
                                      value={formValue.code} 
                                      onChange={handleChange} />
                          </div>
                      </div>
                      {formValue.code === "" ? <button className="deseableBtn">Verificar</button> :
                          loading  ? <div className="loader">
                             <BeatLoader
                          color="rgba(255, 68, 0,1)"
                          cssOverride={{}}
                          margin={10}
                          size={10}
                          speedMultiplier={1}
                      />
                        </div> : <button onClick = {detailReceive}>Verificar</button>}
                    </div>
                  </div>
            </div>
        </div> 
        
    )
}