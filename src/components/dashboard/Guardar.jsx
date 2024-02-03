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

export default function Guardar(){

    let sessionDeposFromsessionStorage = [];
    if (typeof window !== 'undefined') {
        sessionDeposFromsessionStorage = JSON.parse(sessionStorage.getItem('sessionDepo')) || [];

        
    }

    const [depo, SetDepo] = useState( sessionDeposFromsessionStorage);
    const [update, SetUpdate] = useState(0);
    const [isMounted, setIsMounted] = useState(false);
    const { credential } = useContext(AuthContext);
    const [formValue,setFormValue]=useState({
        amount:'',
        user: credential ? credential.username : '',
        state: ''
      });
      const [loading,setLoading] = useState(false)


    useEffect(() => { 
        setIsMounted(true);
        donaciones()
        
        
        if (credential === null) {
          router.push('/accounts/login');
       }
       /* AOS.init({
          duration:2000
        });*/
      }, []);

      useEffect(() => {
        SetDepo(JSON.parse(sessionStorage.getItem('sessionDepo')))
        console.log("depo",depo)
       }, []); // Este efecto se ejecutará cada vez que 'depo' cambie

  useEffect(() => {
    // Este efecto se ejecutará cada vez que 'depo' cambie
    sessionStorage.setItem('sessionDepo', JSON.stringify(depo));
    console.log("codigossessionStorage", depo);
    console.log("depo", depo);
  }, [depo]);
    

      /*------------CREAR UN sessionDepo------------- */
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
              let codigossessionStorage = JSON.parse(sessionStorage.getItem('sessionDepo')) || [];

              
              let codigosResponse = response.data;
              codigossessionStorage.push(codigosResponse)
                          
              console.log("codigossessionStorage1",codigossessionStorage)
              
              
              // Guarda los datos actualizados en el almacenamiento local
              sessionStorage.setItem('sessionDepo', JSON.stringify(codigossessionStorage));
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


        /*------------OBTENER sessionDepoS------------- */
        const donaciones = async () =>{
            const token = sessionStorage.getItem('access')
            console.log(token)
            
            try {
                const response = await axios.get('https://zona0.onrender.com/banking/account/', { 
                   headers: {
                       'Authorization': 'Bearer ' + token
                   }
                 });

                 console.log(response.data)
                
                 // Obtén los datos del almacenamiento local
                let codigossessionStorage = JSON.parse(sessionStorage.getItem('sessionDepo')) || [];
                            
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
                sessionStorage.setItem('sessionDepo', JSON.stringify(codigosResponse));

                SetDepo(codigosResponse);
                   
                    
                
               } catch(error) {
                console.log(error.response);
                /*if(error.response.status === 404){
                    sessionStorage.setItem('sessionDepo','');
                    SetDepo([]);
                }*/
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
        <div className={style.cont}>
            <div className={style.content}>
                <div className={style.header} /*data-aos="fade-up"*/>
                  <div className={style.line}></div>
                  <h3>Bancarizar</h3> 
                </div>
                
                <div className={style.bx}>
                    <div  className={style.contBx}>

                        <div className={style.description}>
                              <span>Entre el monto:</span>
                              <p>Deposita tus fondos y obtén un interés fijo del 3% mensual para hacer crecer tus ahorros.</p>
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

                <div className={style.sessionDeposBx}>
                    <div className={style1.header} /*data-aos="fade-up"*/>
                      <div className={style1.line}></div>
                      <h3>Depositos</h3> 
                    </div>
                    <div className={style.depo}>
                       {depo !== null ?  depo.map((index) =>{
                        
                        return index.state === "Banked" ? <DepositosCard res = {index} key = {index}/> : ""
                        }): <div className={style.empty}>No has realizado ningun deposito todavia</div>}
                        
                    </div>
                </div>


                </div>
                
                
                    
            
                
            </div>
        </div> 
    )
}