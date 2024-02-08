"use client"

import style1 from "../../../public/assets/styles/Recompensa.module.css"
import style from "../../../public/assets/styles/Guardar.module.css"
import style2 from "../../../public/assets/styles/Recibir.module.css"
import DepositosCard from "./DepositosCard"
import { useState, useEffect } from "react"
import axios from "axios"
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import BeatLoader from "react-spinners/BeatLoader"
import ErrorDialog from "../ErrorDialog"
import Dialog from "../Dialog"
import { IoIosCalculator } from "react-icons/io";
import Calculadora from "./Calculadora"

export default function Guardar(){

    let depositsFromsessionStorage = [];
    if (typeof window !== 'undefined') {
        depositsFromsessionStorage = JSON.parse(sessionStorage.getItem('deposit')) || [];

        
    }
    
    const [depo, SetDepo] = useState( depositsFromsessionStorage);
    const [selectedD, setSelectedD] = useState(null)
    const [isMounted, setIsMounted] = useState(false);
    const [loadingDialog, SetLoadingDialog] = useState(false);
    const [visible, SetVisible] = useState(false);
    const [dialog, Setdialog] = useState(false);
    const [resp, setResp] = useState(false);
    const { credential } = useContext(AuthContext);
    const [formValue,setFormValue]=useState({
        amount:'',
        user: credential ? credential.username : '',
        state: ''
      });
      const [loading,setLoading] = useState(false)
      const [loadingDeposit,setLoadingDeposit] = useState(true)


    useEffect(() => { 
        setIsMounted(true);
        depositos()
        
        
        if (credential === null) {
          router.push('/accounts/login');
       }
       /* AOS.init({
          duration:2000
        });*/
      }, []);

      useEffect(() => {
        SetDepo(JSON.parse(sessionStorage.getItem('deposit')))
        console.log("depo",depo)
       }, []); // Este efecto se ejecutará cada vez que 'depo' cambie

      useEffect(() => {
        // Este efecto se ejecutará cada vez que 'depo' cambie
        sessionStorage.setItem('deposit', JSON.stringify(depo));
        console.log("codigossessionStorage", depo);
        console.log("depo", depo);
      }, [depo]);
    

      /*------------CREAR UN DEPOSITO------------- */
      const createDeposit = async () =>{
        const token = sessionStorage.getItem('access')
        console.log(token)
        console.log("Peticion")
        setLoading(true)
        formValue.state = 'Banked'
        console.log(formValue)
        try {
            const response = await axios.post('https://zona0.onrender.com/banking/account/', formValue, { 
                headers: {
                    'Authorization': 'Bearer ' + token
                }
              });
              console.log("CODIGO")

              // Obtén los datos del almacenamiento local
              let codigossessionStorage = JSON.parse(sessionStorage.getItem('deposit')) || [];

              
              let codigosResponse = response.data;
              codigossessionStorage.push(codigosResponse)
                          
              console.log("codigossessionStorage1",codigossessionStorage)
              
              
              // Guarda los datos actualizados en el almacenamiento local
              sessionStorage.setItem('deposit', JSON.stringify(codigossessionStorage));
              SetDepo(codigossessionStorage);
              
              console.log("codigossessionStorage",codigossessionStorage)
              console.log("depo",depo)
              

            setLoading(false)

            console.log(response.data)
           } catch(error) {
            console.log(error.response);
            setLoading(false)
           }
           
    }

     /*-----PARA VISIBILIZAR EL ERROR DIALOG------*/
     const [isObjectVisible, setIsObjectVisible] = useState(false);
     const errorVisible = () => {
       setIsObjectVisible(true);
       setTimeout(() => {
           setIsObjectVisible(false);
       }, 3000);
    }

          


        /*------------OBTENER DEPOSITOS------------- */
        const depositos = async () =>{
            const token = sessionStorage.getItem('access')
            console.log(token)
            setLoadingDeposit(true)
            
            try {
                const response = await axios.get('https://zona0.onrender.com/banking/account/', { 
                   headers: {
                       'Authorization': 'Bearer ' + token
                   }
                 });

                 console.log(response.data)
                
                 // Obtén los datos del almacenamiento local
                let codigossessionStorage = JSON.parse(sessionStorage.getItem('deposit')) || [];
                            
                // Obtén los datos de la respuesta de la petición
                let codigosResponse = response.data;
                            
                // Para cada elemento en los datos de la respuesta de la petición
                codigosResponse.forEach(codigoResponse => {
                   // Verifica si el elemento ya existe en el almacenamiento local
                   let existeEnsessionStorage = codigossessionStorage.some(codigosessionStorage => codigosessionStorage.id === codigoResponse.id);
                
                   // Si el elemento no existe en el almacenamiento local, agrégalo
                   if (!existeEnsessionStorage) {
                       codigossessionStorage.push(codigoResponse);
                   }
                });
                
                // Para cada elemento en el almacenamiento local
                codigossessionStorage.forEach((codigosessionStorage, index) => {
                   // Verifica si el elemento existe en los datos de la respuesta de la petición
                   let existeEnResponse = codigosResponse.some(codigoResponse => codigoResponse.id === codigosessionStorage.id);
                
                   // Si el elemento no existe en los datos de la respuesta de la petición, elimínalo del almacenamiento local
                   if (!existeEnResponse) {
                       codigossessionStorage.splice(index, 1);
                   }
                });
                
                // Guarda los datos actualizados en el almacenamiento local
                sessionStorage.setItem('deposit', JSON.stringify(codigosResponse));

                SetDepo(codigosResponse);
                setLoadingDeposit(false)
                    
                
               } catch(error) {
                console.log(error.response);
                setLoadingDeposit(false)
                if(error.response.status === 404){
                  localStorage.removeItem('deposit');
                  SetDepo([]);
              }
              
               }    
             }

        /*------------RETIRAR------------- */
    const retirar = async () =>{
      const token = sessionStorage.getItem('access')
      console.log(token)
      console.log("Peticion")
      setLoading(true)
      console.log(token)
      SetLoadingDialog(true)
      try {
          const response = await axios.post(`https://zona0.onrender.com/banking/account/withdraw/?id=${selectedD}`,{},{ 
              headers: {
                  'Authorization': 'Bearer ' + token
              }
            });
            console.log(response.data)

          let codigossessionStorage = JSON.parse(sessionStorage.getItem('deposit')) || [];

          let idToRemove = selectedD; // Reemplaza esto con el ID que quieres eliminar
          let newArray = codigossessionStorage.filter(obj => obj.id !== idToRemove);
          console.log("newArray",newArray)
          sessionStorage.setItem('deposit', JSON.stringify(newArray));
          let updatedArray = JSON.parse(sessionStorage.getItem('deposit'));
          console.log("updatedArray", updatedArray);

          SetLoadingDialog(false)
          errorVisible(JSON.parse(sessionStorage.getItem('deposit')))
          setResp(response.data.message)
          SetDepo(updatedArray)
          Setdialog(false)
         } catch(error) {
          console.log(error.response)
          SetLoadingDialog(false)
          Setdialog(false)
         }
         
  }     
    

        const handleChange= (event) => {
           setFormValue({
             ...formValue,
             [event.target.name]:event.target.value
           })
         }

        

        if (!isMounted) {
           return null; // Or some placeholder content
          }

    return(
        <div className="cont">
          {dialog &&  <div className={style.prov}>
            <Dialog 
                    header = "Retirar OSP"
                    content = "Estas seguro de que quieres retirar el deposito?" 
                    SetActive = {Setdialog} 
                    loading = {loadingDialog} 
                    Setloading = {SetLoadingDialog}
                   
                    fnc = {retirar}/>  
          </div>}
          {visible && <div className={style.prov}>
            <Calculadora SetVisible = {SetVisible}/>
          </div>}
          
     
        
           
                       
            <div className="content">
            
            {isObjectVisible && <div className={style.error} >
                         <ErrorDialog error = {resp} /> </div>}
                <div className={style.header} /*data-aos="fade-up"*/>
                  <div className={style.line}></div>
                  <h3>Bancarizar <button className={style.btn} onClick={() => SetVisible(true)}><span><IoIosCalculator/></span> <span>Calculadora</span></button></h3> 
                </div>
                
                <div className="bx">
                    <div  className="contBx">
                        <div className="description">
                              <span>Entre el monto:</span>
                              <p>Deposita tus fondos y obtén un interés fijo del 3% cada 30 dias para hacer crecer tus ahorros.</p>
                              <p className={style.infoWarning}>Las OSP depositadas quedaran congeladas un total de 60 dias. Luego de eso podra retirarlas.</p>
                          </div>

                          <div className={style2.input}>
                           {/* <label >Monto a recibir:</label>*/}
                            <div className={style2.inputBx}>
                                <input  type="text" 
                                        name="amount" id=""
                                        value={formValue.amount}
                                        onChange={handleChange} 
                                        placeholder="Monto"
                                        onKeyDown={(event) => {
                                            const keyCode = event.keyCode;
                                            const isNumber = (keyCode >= 48 && keyCode <= 57);
                                            const isBackspace = (keyCode === 8);
                                            if (!isNumber && !isBackspace) {
                                              event.preventDefault();
                                            }
                                          }}/>
                                <span>OSP</span>
                            </div>
                        </div>

                        {formValue.amount === "" ? <button className={style.deseableBtn}>Bancarizar</button> :
                        loading  ? <div className={style.loader}>
                           <BeatLoader
                        color="rgba(255, 68, 0,1)"
                        cssOverride={{}}
                        margin={10}
                        size={10}
                        speedMultiplier={1}
                        />
                    </div> : <button onClick = {createDeposit}>Bancarizar</button>}
                                      

                    </div>

                <div className={style.depositsBx}>
                    <div className="header" /*data-aos="fade-up"*/>
                      <div className="line"></div>
                      <h3>Depositos</h3> 
                    </div>
                    
                    <div className={style.depo}>
                    {loadingDeposit  ? <div className={style.loaderDepo}>
                           <BeatLoader
                        color="rgba(255, 68, 0,1)"
                        cssOverride={{}}
                        margin={10}
                        size={10}
                        speedMultiplier={1}
                        />
                    </div> : 
                        depo.length !== 0 
                           ? depo
                             .filter(index => index.state === "Banked") // Filtramos aquí
                             .map((index) => (
                               <DepositosCard 
                                 res={index} 
                                 key={index} 
                                 setResp={setResp}
                                 errorVisible={errorVisible}
                                 SetDepo = {SetDepo}
                                 depo = {depo}
                                 setVisible = {Setdialog}
                                 setSelected = {setSelectedD}
                               />
                             ))
                           : <div className={style.empty}>No has realizado ningún depósito todavía</div>
                             }
                             
                        
                    </div>
                    
                </div>
                </div>

            </div>
        </div> 
    )
}