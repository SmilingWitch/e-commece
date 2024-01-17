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



  const [res, SetRes] = useState([])
    
    let codesFromLocalStorage = [];
    let codesEfectFromLocalStorage = [];
    if (typeof window !== 'undefined') {
     codesFromLocalStorage = JSON.parse(localStorage.getItem('payCode')) || [];
     codesEfectFromLocalStorage = JSON.parse(localStorage.getItem('payCodeEfect')) || [];
     /*localStorage.setItem('payCode', "")*/
    }
    const [code, SetCode] = useState(codesFromLocalStorage);
    const [codeEfect, SetCodeEfect] = useState(codesEfectFromLocalStorage);


     useEffect(() => { 
        setIsMounted(true);
        recibosPending() 
        recibosEfectuados() 
      }, []);


      const handleScan = (result, error) => {
        if (result) {
          setData(result.text);
        }
        if (error) {
          console.info(error);
        }
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
             
             SetCode(JSON.parse(localStorage.getItem('payCode')))
             console.log("CODE1",code ) 
                // Obtén los datos del almacenamiento local
            let codigosLocalStorage = JSON.parse(localStorage.getItem('payCode')) || [];
                        
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
            localStorage.setItem('payCode', JSON.stringify(codigosLocalStorage));
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
               SetRes(response.data)
               
               SetCode(JSON.parse(localStorage.getItem('payCodeEfect')))
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
  
      
           if (!isMounted) {
            return null; // Or some placeholder content
           }

    return (
        /*user !== null ?*/<div className={style.cont} >
          <div className={style.content}>
            <div className={style.operations}>
              <div className={style.total}>
                <div className={style.balance}>Balance Total</div>
                <span>400 OSP</span>
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
    
                  {currentComponent === 0 && codeEfect.length > 0 ? codeEfect.map((item, index) => (
                    <Transaction key={item.id} res = {item}/>
                  )) : (
                    currentComponent !== 0 ? (
                      ""
                    ) : (
                      <div className={style.empty}>No hay solicitudes de recibos efectuados.</div>
                    )
                  )}
                  {currentComponent === 1 && code.length > 0 ? code.map((item, index) => (
                    <Transaction key={item.id} res = {item}/>
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
              <div className={style.empty}>No existen solicitudes de envio.</div>
            </div>

          </div>
        </div> 
    )
  }
  