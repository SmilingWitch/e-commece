"use client"
import style from "../../../public/assets/styles/Wallet.module.css"
import { LuArrowDownToLine, LuArrowUpFromLine } from "react-icons/lu";
import Transaction from "./Transaction";
import {useState, useEffect} from "react"
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import Image from "next/image"
import Link from "next/link"
import { SiMicrosoftexcel } from "react-icons/si";
import axios from "axios"
import { QrReader } from 'react-qr-reader';
import { FaBalanceScale } from "react-icons/fa";
import { IoGiftOutline } from "react-icons/io5";
import { IoGameControllerOutline } from "react-icons/io5";
import { BiDonateHeart } from "react-icons/bi";
import Details from "./Details";
import Dialog from "../Dialog";
import TransactionSend from "./TransactionSend";


export default function Wallet() {
  const [data, setData] = useState('No result');
  const { user } = useContext(AuthContext);
  const [showTransactions, setShowTransactions] = useState(30);
  const [isMounted, setIsMounted] = useState(false);
   const showLessTransactions = () => {
    setShowTransactions( 10);
   };

    const [currentComponent, setCurrentComponent] = useState(0);
    const [send, SetSend] = useState(false)
    const [visible, SetVisible] = useState(false)
    const [dialog, setDialog] = useState(false)
    const [selectedD, setSelectedD] = useState(0)
    const [loading, setLoading] = useState(false)
    const [res, SetRes] = useState([])
    const [resSend, SetResSend] = useState([])
    const [resEffect, SetEffect] = useState([])
    
    let codesFromLocalStorage = [];
    let pointsFromLocalStorage = 0;
    let codesEfectFromLocalStorage = [];
    let codesEnvioFromLocalStorage = [];
    if (typeof window !== 'undefined') {
    
     codesFromLocalStorage = JSON.parse(localStorage.getItem('pay')) || [];
     pointsFromLocalStorage = JSON.parse(localStorage.getItem('points')) || [];
     codesEfectFromLocalStorage = JSON.parse(localStorage.getItem('payCodeEfect')) || [];
     codesEnvioFromLocalStorage= JSON.parse(localStorage.getItem('send')) || [];
     /*localStorage.setItem('pay', "")*/
    }
    const [code, SetCode] = useState(codesFromLocalStorage || []);
    const [points, SetPoints] = useState(0);
    const [codeEfect, SetCodeEfect] = useState(codesEfectFromLocalStorage);
    const [codeEnvios, SetCodeEnvios] = useState(codesEnvioFromLocalStorage);
    const [receiveIdToDelete, setReceiveIdToDelete] = useState(null);

     useEffect(() => { 
        setIsMounted(true);
        recibosPending() 
        recibosEfectuados() 
        envios()
       getPoints()
      }, []);


      const handleScan = (result, error) => {
        if (result) {
          setData(result.text);
        }
        if (error) {
          console.info(error);
        }
      };


         const createLink = (index) => {
           setSelectedD(index);
           console.log(index)
        };
        /*------------RECIBOS PENDRIENTES------------- */

        const recibosPending = async () =>{
        const token = sessionStorage.getItem('access')
        console.log(token)
        console.log("Peticion")
        
        try {
            const response = await axios.get('https://zona0.onrender.com/transfer/list-unpaid-receive/', { 
               headers: {
                   'Authorization': 'Bearer ' + token
               }
             });
             SetRes(response.data)
             
             SetCode(JSON.parse(localStorage.getItem('pay')))
             console.log("CODE1",code ) 
                // Obtén los datos del almacenamiento local
            let codigosLocalStorage = JSON.parse(localStorage.getItem('pay')) || [];
                        
            // Obtén los datos de la respuesta de la petición
            let codigosResponse = response.data;
                        
            // Para cada elemento en los datos de la respuesta de la petición
            codigosResponse.forEach(codigoResponse => {
               // Verifica si el elemento ya existe en el almacenamiento local
               let existeEnLocalStorage = codigosLocalStorage.some(codigoLocalStorage => codigoLocalStorage.id === codigoResponse.id);
            
               // Si el elemento no existe en el almacenamiento local, agrégalo
               if (!existeEnLocalStorage) {
                   codigosLocalStorage.push(codigoResponse);
               }
            });
            
            // Para cada elemento en el almacenamiento local
            codigosLocalStorage.forEach((codigoLocalStorage, index) => {
               // Verifica si el elemento existe en los datos de la respuesta de la petición
               let existeEnResponse = codigosResponse.some(codigoResponse => codigoResponse.id === codigoLocalStorage.id);
            
               // Si el elemento no existe en los datos de la respuesta de la petición, elimínalo del almacenamiento local
               if (!existeEnResponse) {
                   codigosLocalStorage.splice(index, 1);
               }
            });
            
            // Guarda los datos actualizados en el almacenamiento local
            localStorage.setItem('pay', JSON.stringify(codigosLocalStorage));
            SetCode(codigosLocalStorage);
            console.log("CODE2",code )
            console.log("Code", code)
               
                
            
           } catch(error) {
            console.log(error.response);
           }    
         }

         /*------------RECIBOS EFECTUADOS------------- */
         const recibosEfectuados = async () =>{
          const token = sessionStorage.getItem('access')
          console.log(token)
          console.log("Peticion")
          
          try {
              const response = await axios.get('https://zona0.onrender.com/transfer/list-paid-receive/', { 
                 headers: {
                     'Authorization': 'Bearer ' + token
                 }
               });
               SetEffect(response.data)
               
               SetCodeEfect(JSON.parse(localStorage.getItem('payCodeEfect')))
               console.log("CODE1",codeEfect ) 
                  // Obtén los datos del almacenamiento local
              let codigosLocalStorage = JSON.parse(localStorage.getItem('payCodeEfect')) || [];
                          
              // Obtén los datos de la respuesta de la petición
              let codigosResponse = response.data;
                          
              // Para cada elemento en los datos de la respuesta de la petición
              codigosResponse.forEach(codigoResponse => {
                 // Verifica si el elemento ya existe en el almacenamiento local
                 let existeEnLocalStorage = codigosLocalStorage.some(codigoLocalStorage => codigoLocalStorage.id === codigoResponse.id);
              
                 // Si el elemento no existe en el almacenamiento local, agrégalo
                 if (!existeEnLocalStorage) {
                     codigosLocalStorage.push(codigoResponse);
                 }
              });
              
              // Para cada elemento en el almacenamiento local
              codigosLocalStorage.forEach((codigoLocalStorage, index) => {
                 // Verifica si el elemento existe en los datos de la respuesta de la petición
                 let existeEnResponse = codigosResponse.some(codigoResponse => codigoResponse.id === codigoLocalStorage.id);
              
                 // Si el elemento no existe en los datos de la respuesta de la petición, elimínalo del almacenamiento local
                 if (!existeEnResponse) {
                     codigosLocalStorage.splice(index, 1);
                 }
              });
              
              // Guarda los datos actualizados en el almacenamiento local
              localStorage.setItem('payCodeEfect', JSON.stringify(codigosLocalStorage));
              SetCodeEfect(codigosLocalStorage);
              console.log("CODE2",codeEfect)
              console.log("Code", codeEfect)
                 
                  
              
             } catch(error) {
              console.log(error.response);
             }    
           }

           /*------------ENVIOS------------- */
         const envios = async () =>{
          const token = sessionStorage.getItem('access')
          console.log(token)
          console.log("Peticion")
          
          try {
              const response = await axios.get('https://zona0.onrender.com/transfer/list-sendTransfer/', { 
                 headers: {
                     'Authorization': 'Bearer ' + token
                 }
               });
               SetResSend(response.data)
               console.log("envios",response.data)
               
               SetCodeEnvios(JSON.parse(localStorage.getItem('send')))
               console.log("CODE1",codeEfect ) 
                  // Obtén los datos del almacenamiento local
              let codigosLocalStorage = JSON.parse(localStorage.getItem('send')) || [];
                          
              // Obtén los datos de la respuesta de la petición
              let codigosResponse = response.data;
                          
              // Para cada elemento en los datos de la respuesta de la petición
              codigosResponse.forEach(codigoResponse => {
                 // Verifica si el elemento ya existe en el almacenamiento local
                 let existeEnLocalStorage = codigosLocalStorage.some(codigoLocalStorage => codigoLocalStorage.id === codigoResponse.id);
              
                 // Si el elemento no existe en el almacenamiento local, agrégalo
                 if (!existeEnLocalStorage) {
                     codigosLocalStorage.push(codigoResponse);
                 }
              });
              
              // Para cada elemento en el almacenamiento local
              codigosLocalStorage.forEach((codigoLocalStorage, index) => {
                 // Verifica si el elemento existe en los datos de la respuesta de la petición
                 let existeEnResponse = codigosResponse.some(codigoResponse => codigoResponse.id === codigoLocalStorage.id);
              
                 // Si el elemento no existe en los datos de la respuesta de la petición, elimínalo del almacenamiento local
                 if (!existeEnResponse) {
                     codigosLocalStorage.splice(index, 1);
                 }
              });
              
              // Guarda los datos actualizados en el almacenamiento local
              localStorage.setItem('send', JSON.stringify(codigosLocalStorage));
              SetCodeEnvios(codigosLocalStorage);
              console.log("CODE ENVIOS",codigosLocalStorage)
              
                 
                  
              
             } catch(error) {
              console.log(error.response);
             }    
           }


            /*------------PUNTOS------------- */
         const getPoints = async () =>{
          const token = sessionStorage.getItem('access')
          console.log(token)
          console.log("Peticion")
          
          try {
              const response = await axios.get('https://zona0.onrender.com/accounts/osp_points/', { 
                 headers: {
                     'Authorization': 'Bearer ' + token
                 }
               });
               SetPoints(response.data.orcaStore_point)

               console.log("RESPONSE",response.data)
               
              /* SetCodeEnvios(JSON.parse(localStorage.getItem('points')))
               console.log("CODE1",codeEfect ) 
                  // Obtén los datos del almacenamiento local
              let codigosLocalStorage = JSON.parse(localStorage.getItem('points')) || [];
                          
              // Obtén los datos de la respuesta de la petición
              let codigosResponse = response.data;
                          
              // Para cada elemento en los datos de la respuesta de la petición
              codigosResponse.forEach(codigoResponse => {
                 // Verifica si el elemento ya existe en el almacenamiento local
                 let existeEnLocalStorage = codigosLocalStorage.some(codigoLocalStorage => codigoLocalStorage.id === codigoResponse.id);
              
                 // Si el elemento no existe en el almacenamiento local, agrégalo
                 if (!existeEnLocalStorage) {
                     codigosLocalStorage.push(codigoResponse);
                 }
              });
              
              // Para cada elemento en el almacenamiento local
              codigosLocalStorage.forEach((codigoLocalStorage, index) => {
                 // Verifica si el elemento existe en los datos de la respuesta de la petición
                 let existeEnResponse = codigosResponse.some(codigoResponse => codigoResponse.id === codigoLocalStorage.id);
              
                 // Si el elemento no existe en los datos de la respuesta de la petición, elimínalo del almacenamiento local
                 if (!existeEnResponse) {
                     codigosLocalStorage.splice(index, 1);
                 }
              });
              
              // Guarda los datos actualizados en el almacenamiento local
              localStorage.setItem('send', JSON.stringify(codigosLocalStorage));
              SetCodeEnvios(codigosLocalStorage);
              console.log("CODE2",codeEfect)
              console.log("Code", codeEfect)
                 */
                  
              
             } catch(error) {
              console.log(error.response);
             }    
           }


            /*------------ELIMINAR EL CODIGO------------- */
      const DeleteRecieves = async (id) =>{
      const token = sessionStorage.getItem('access')
      setLoading(true)
      console.log(token)
      console.log("Peticion")
      try {
          const response = await axios.delete(`https://zona0.onrender.com/transfer/list-delete-unpaid-receive/${id}`, { 
             headers: {
                 'Authorization': 'Bearer ' + token
             }
           });

           SetResDelete(response.data)
          console.log(response);
          setDialog(false)
          setLoading(false)


          // Eliminar el código del arreglo en el localStorage
          // Obtén los datos del almacenamiento local
          let codigosLocalStorage = JSON.parse(localStorage.getItem('pay')) || [];

          // Filtra los datos para excluir el elemento que deseas eliminar
          codigosLocalStorage = codigosLocalStorage.filter(codigo => codigo.id !== id);

          // Guarda los datos actualizados en el almacenamiento local
          localStorage.setItem('pay', JSON.stringify(codigosLocalStorage));

          SetCode(codigosLocalStorage);

          console.log("CODE5", codigosLocalStorage);
          
         } catch(error) {
          console.log(error.response);
          setLoading(false)
         }    
       }

  
           if (!isMounted) {
            return null; // Or some placeholder content
           }

    return (
        <div className={style.cont} >
          
          {visible && <Details
                        SetVisible = {SetVisible}
                        recibir = {code[selectedD]}
            /> }
        {dialog && <Dialog header = "Borrar Codigo de Pago"
                                content = "Estas seguro que quieres borrar este Codigo de Pago?"
                                SetActive = {setDialog}
                                active = {dialog}
                                fnc = {() => DeleteRecieves(receiveIdToDelete)}
                                setLoading = {setLoading}
                                loading = {loading}
            />}
          <div className={style.content}>
            <div className={style.operations}>
            
              <div className={style.total}>
                <div className={style.balance}>Balance Total</div>
                <span>{points} OSP</span>
                
                <div className={style.imgBxWallet}>
                  <Image 
                    layout='fill'
                    objectFit='cover' // or 'contain'
                    alt="Descriptive alt text"
                    src = "/assets/images/fondo_pantalla_con_olas_del_mar_de_color_anaranj.jpg"></Image>

               </div>
                
              </div>
              <div className={style.oppBx}>

              <Link href = "/dashboard/recibir">
                <div className={style.opp}>
                  <div>
                    <LuArrowDownToLine/>
                  </div>
                  <span>Recibir</span>
                </div></Link>

                <Link href = "/dashboard/enviar">
                <div className={style.opp}>
                  <div>
                    <LuArrowUpFromLine/>
                  </div>
                  <span>Enviar</span>
                </div>
                </Link>

                <Link href = "/dashboard/guardar">
                <div className={style.opp}>
                  <div>
                    <FaBalanceScale />
                  </div>
                  <span>Bancarizar</span>
                </div>
                </Link>

                <Link href = "/dashboard/recompensa">
                <div className={style.opp}>
                  <div>
                    <IoGiftOutline />
                  </div>
                  <span>Canjear Codigo</span>
                </div>
                </Link>

                
                <div className={style.opp}>
                  <div>
                    <IoGameControllerOutline/>
                  </div>
                  <span>Jugar</span>
                </div>

                <Link href = "/dashboard/donar">
                <div className={style.opp}>
                  <div>
                    <BiDonateHeart/>
                  </div>
                  <span>Donar</span>
                </div>
                </Link>

              </div>
            </div>

            <div className={style.header}>
              <div className={style.line}></div>
              <h3>Recibos</h3> 
            </div>

            <div className={style.options}>
              {/*<button><SiMicrosoftexcel/></button>*/}
              <div className={style.transactions}>
              <div className={style.slider}>
                <div className={style.header1}>
                    <span onClick={() => setCurrentComponent(0)}
                        className = {currentComponent === 0 ? `${style.active}`: `${style.inActive}`}
                    >Efectuados({codeEfect.length}) </span>
                    <span onClick={() => setCurrentComponent(1)}
                        className = {currentComponent === 1 ? `${style.active}`: `${style.inActive}`}
                    >Pendientes({code.length}) </span>
                </div>
                <div className={style.transactionBx}>
    
                  {currentComponent === 0 && codeEfect.length > 0 ? 
                  codeEfect.map((item, index) => (
                    <Transaction 
                            key={item.id} 
                            res = {item}
                            />
                  )) : (
                    currentComponent !== 0 ? (
                      ""
                    ) : (
                      <div className={style.empty}>No hay solicitudes de recibos efectuados.</div>
                    )
                  )}
                  {currentComponent === 1 && code.length > 0 ? 
                  code.map((item, index) => (
                        <Transaction
                      key={item.id} 
                      res = {item}
                      SetVisible = {SetVisible}
                      setSelected = {setSelectedD}
                      setDialog = {() => {
                        setReceiveIdToDelete(item.id);
                        setDialog(true);
                      }}
                      visible={visible}
                      index = {index}/>
                  )) : (
                    currentComponent !== 1 ? (
                      ""
                    ) : (
                      <div className={style.empty}>No hay solicitudes de recibos pendientes.</div>
                    )
                  )}

                </div>
                
            </div>

              </div>
            </div>

            <div className={style.header}>
              <div className={style.line}></div>
              <h3>Envios</h3> 
            </div>
            <div className={style.transactions}>
            {codeEnvios.length > 0 ? 
                  resSend.map((item, index) => (
                    <TransactionSend
                            key={item.id} 
                            res = {item}
                            />
                  )) : (
                    currentComponent !== 0 ? (
                      ""
                    ) : (
                      <div className={style.empty}>No existen solicitudes de envio.</div>
                    )
                  )}
              
            </div>

          </div>
        </div> 
    )
  }
  