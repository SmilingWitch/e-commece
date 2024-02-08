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
import { FaBalanceScale } from "react-icons/fa";
import { IoGiftOutline } from "react-icons/io5";
import { IoGameControllerOutline } from "react-icons/io5";
import { BiDonateHeart } from "react-icons/bi";
import { FaRegCreditCard } from "react-icons/fa";
import Details from "./Details";
import Dialog from "../Dialog";
import TransactionSend from "./TransactionSend";
import AOS from 'aos';
import 'aos/dist/aos.css';
import TransactionDonations from "./TransactionDonation";
import { useRouter } from "next/navigation";


export default function Wallet() {
    const { user } = useContext(AuthContext);
    const { credential } = useContext(AuthContext);

    // variable
    let codesFromsessionStorage = [];
    let pointsFromsessionStorage = 0;
    let codesEfectFromsessionStorage = [];
    let codesEnvioFromsessionStorage = [];
    let codesDonacionesFromsessionStorage = [];
    if (typeof window !== 'undefined') {
      codesFromsessionStorage = JSON.parse(sessionStorage.getItem('pay')) || [];
      pointsFromsessionStorage = JSON.parse(sessionStorage.getItem('points')) || 0;
      codesEfectFromsessionStorage = JSON.parse(sessionStorage.getItem('payCodeEfect')) || [];
      codesEnvioFromsessionStorage = JSON.parse(sessionStorage.getItem('send')) || [];
      codesDonacionesFromsessionStorage = JSON.parse(sessionStorage.getItem('donaciones')) || [];
    }

    // states
    const [data, setData] = useState('No result');
    const [showTransactions, setShowTransactions] = useState(30);
    const [isMounted, setIsMounted] = useState(false);
    const [currentComponent, setCurrentComponent] = useState(0);
    const [currentReceiveComponent, setCurrentReceiveComponent] = useState(2);
    const [currentSendComponent, setCurrentSendComponent] = useState(4);
    const [send, SetSend] = useState(false)
    const [visible, SetVisible] = useState(false)
    const [visibleEffect, SetVisibleEffect] = useState(false)
    const [dialog, setDialog] = useState(false)
    const [selectedD, setSelectedD] = useState(0)
    const [loading, setLoading] = useState(false)
    const [res, SetRes] = useState([])
    const [resSend, SetResSend] = useState([])
    const [resEffect, SetEffect] = useState([])
    const [code, SetCode] = useState(codesFromsessionStorage || []);
    const [points, SetPoints] = useState( pointsFromsessionStorage);
    const [codeEfect, SetCodeEfect] = useState(codesEfectFromsessionStorage);
    const [codeEnvios, SetCodeEnvios] = useState(codesEnvioFromsessionStorage);
    const [donaciones, SetDonaciones] = useState(codesDonacionesFromsessionStorage);
    const [receiveIdToDelete, setReceiveIdToDelete] = useState(null);
    const router = useRouter()

    useEffect(() => { 
      setIsMounted(true);
      recibosPending() 
      recibosEfectuados() 
      envios()
      getPoints()
      donados()
      
      if (credential === null) {
        router.push('/accounts/login');
     }
      AOS.init({
        duration:2000
      });
    }, []);

   /* useEffect(() => { 
      
      recibosPending() 
     
    }, [codesFromsessionStorage]);*/


    // functions
    const showLessTransactions = () => {
      setShowTransactions( 10);
     };
    const handleScan = (result, error) => {
      if (result) {
        setData(result.text);
      }
      if (error) {
        console.info(error);
      }};


      const createLink = (index) => {
        setSelectedD(index);
        console.log(index)
      };

    /*------------RECIBOS PENDRIENTES------------- */
      const recibosPending = async () =>{
      const token = sessionStorage.getItem('access')
      console.log(token)
      
      try {
          const response = await axios.get('https://zona0.onrender.com/transfer/list-unpaid-receive/', { 
             headers: {
                 'Authorization': 'Bearer ' + token
             }
           });
           SetRes(response.data)
           
           SetCode(JSON.parse(sessionStorage.getItem('pay')))
              // Obtén los datos del almacenamiento local
          let codigossessionStorage = JSON.parse(sessionStorage.getItem('pay')) || [];
                      
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
          sessionStorage.setItem('pay', JSON.stringify(codigossessionStorage));
          SetCode(codigossessionStorage);
             
              
          
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
              
              SetCodeEfect(JSON.parse(sessionStorage.getItem('payCodeEfect')))
                 // Obtén los datos del almacenamiento local
             let codigossessionStorage = JSON.parse(sessionStorage.getItem('payCodeEfect')) || [];
                         
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
             sessionStorage.setItem('payCodeEfect', JSON.stringify(codigossessionStorage));
             SetCodeEfect(codigossessionStorage);
             console.log("CODE EFFECT",codeEfect)
                
                 
             
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
               
               SetCodeEnvios(JSON.parse(sessionStorage.getItem('send')))
               console.log("CODE1",codeEfect ) 
                  // Obtén los datos del almacenamiento local
              let codigossessionStorage = JSON.parse(sessionStorage.getItem('send')) || [];
                          
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
              sessionStorage.setItem('send', JSON.stringify(codigossessionStorage));
              SetCodeEnvios(codigossessionStorage);
              console.log("CODE ENVIOS",codigossessionStorage)
              
                 
                  
              
             } catch(error) {
              console.log(error.response);
             }    
           }

    /*------------DONACIONES------------- */
         const donados = async () =>{
          const token = sessionStorage.getItem('access')
          console.log(token)
          console.log("Peticion")
          
          try {
              const response = await axios.get('https://zona0.onrender.com/institutions/donations/', { 
                 headers: {
                     'Authorization': 'Bearer ' + token
                 }
               });
               
               
               SetDonaciones(JSON.parse(sessionStorage.getItem('donaciones')))
               console.log("CODE1",codeEfect ) 
                  // Obtén los datos del almacenamiento local
              let codigossessionStorage = JSON.parse(sessionStorage.getItem('donaciones')) || [];
                          
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
              sessionStorage.setItem('donaciones', JSON.stringify(codigossessionStorage));
              SetDonaciones(codigossessionStorage);
              console.log("CODE ENVIOS",codigossessionStorage)
              
                 
                  
              
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
               

               let numeroEnSessionStorage = sessionStorage.getItem("points");
               
               if (numeroEnSessionStorage !== response.data.orcaStore_point) {
                // Si son diferentes, actualiza el número en sessionStorage
                sessionStorage.setItem("points",response.data.orcaStore_point);
               
             }
             SetPoints(sessionStorage.getItem("points"))
             
             
              console.log("CODE2",codeEfect)
              console.log("Code", codeEfect)
                 
                  
              
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
              /*console.log(response);*/
              setDialog(false)
              setLoading(false)
             
             
              // Eliminar el código del arreglo en el sessionStorage
              // Obtén los datos del almacenamiento local
              let codigossessionStorage = JSON.parse(sessionStorage.getItem('pay')) || [];
             
              // Filtra los datos para excluir el elemento que deseas eliminar
              codigossessionStorage = codigossessionStorage.filter(codigo => codigo.id !== id);
             
              // Guarda los datos actualizados en el almacenamiento local
              sessionStorage.setItem('pay', JSON.stringify(codigossessionStorage));
             
              SetCode(codigossessionStorage);
              setDialog(false)
              /*console.log("CODE5", codigossessionStorage);*/
             }catch(error) {
              console.log(error)
              setDialog(false)
              setLoading(false)
              if(error.response.status === 404){
                recibosPending() 
                setLoading(true)

                
                console.log("ME CAGO EN TODO")
              }
              if(error.response.status === 500){
                recibosPending()
                setLoading(false) 
              }
             }    
           }
         
              
               if (!isMounted) {
                return null; // Or some placeholder content

               }
               

    return (
        <div className="cont" >
          
          {visible && <Details
                        SetVisible = {SetVisible}
                        recibir = {code[selectedD]}
                        SetCode = {SetCode}
            /> }
            {visibleEffect && <Details
                        SetVisible = {SetVisibleEffect}
                        recibir = {codeEfect[selectedD]}
                        SetCode = {SetCode}
            /> }
        {dialog && <Dialog header = "Borrar Codigo de Pago"
                                content = "Estas seguro que quieres borrar este Codigo de Pago?"
                                SetActive = {setDialog}
                                active = {dialog}
                                fnc = {() => DeleteRecieves(receiveIdToDelete)}
                                setLoading = {setLoading}
                                loading = {loading}
            />}
          <div className="content">
            <div className={style.operations} data-aos="fade-up">
            
              <div className={style.total}>
                <div className={style.points}>
                  <div className={style.balance}>Balance Total</div>
                  <span>{points} OSP</span>
                </div>
                
                
                <div className={style.imgBxWallet}>
                  <Image 
                    layout='fill'
                    objectFit='cover' // or 'contain'
                    alt="Descriptive alt text"
                    src = "/assets/images/fondo_pantalla_con_olas_del_mar_de_color_anaranj.jpg"></Image>

               </div>
                
              </div>
              <div className={style.oppBx} data-aos="fade-up">

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
                    <FaRegCreditCard />
                  </div>
                  <span>Tarjetas</span>
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

            <div className="header"/* data-aos="fade-up"*/>
              <div className="line"></div>
              <h3>Ultimas Operaciones</h3> 
            </div>

            <div className={style.options} >

              <div className={style.transactions}>

                <div  className={style.headerTop}>
                  <div className={style.switch}>
                    <span onClick={() => setCurrentComponent(0)}
                        className = {currentComponent === 0 ? `${style.activeTop}`: `${style.inActive}`}
                    >Recibidos </span>
                    <span onClick={() => setCurrentComponent(1)}
                        className = {currentComponent === 1 ? `${style.activeTop}`: `${style.inActive}`}
                    >Enviados </span>

                  </div>
                   
                </div>

                {currentComponent === 0 ? 
                <div className={style.slider}>
                  <div className={style.header1}>
                    <span onClick={() => setCurrentReceiveComponent(2)}
                        className = {currentReceiveComponent === 2 ? `${style.active}`: `${style.inActive}`}
                    >Efectuados ({codeEfect.length})</span>
                    <span onClick={() => setCurrentReceiveComponent(3)}
                        className = {currentReceiveComponent === 3 ? `${style.active}`: `${style.inActive}`}
                    >Pendientes({code.length})</span>
                  </div> 


                  <div className={style.transactionBx}>
                        {currentReceiveComponent === 2 && codeEfect.length > 0 ? 
                        codeEfect.map((item, index) => (
                          <Transaction 
                                  key={item.id} 
                                  res = {item}
                                  SetVisible = { SetVisibleEffect}
                                  setSelected = {setSelectedD}
                                  setDialog = {() => {
                                    setReceiveIdToDelete(item.id);
                                    setDialog(true);
                                  }}
                                  visible={visible}
                                  index = {index}
                                
                                  />
                        )) : (
                          currentReceiveComponent !== 2 ? (
                            ""
                          ) : (
                            <div className={style.empty}>No hay solicitudes de recibos efectuados.</div>
                          )
                        )}
                        {currentReceiveComponent === 3 && code.length > 0 ? 
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
                            index = {index}
                            />
                        )) : (
                          currentReceiveComponent !== 3 ? (
                            ""
                          ) : (
                            <div className={style.empty}>No hay solicitudes de recibos pendientes.</div>
                          )
                        )}

                  </div>

                  
                </div>
 
                
                :

                <div>
                  <div className={style.header1}>
                    <span onClick={() => setCurrentSendComponent(4)}
                        className = {currentSendComponent === 4 ? `${style.active}`: `${style.inActive}`}
                    >Transferencia({resSend.length})</span>
                    <span onClick={() => setCurrentSendComponent(5)}
                        className = {currentSendComponent === 5 ? `${style.active}`: `${style.inActive}`}
                    >Donados({donaciones.length})</span> 
                  </div>

                  <div className={style.transactionBx}>
                    {currentSendComponent === 4 && codeEnvios.length > 0  ? 
                     resSend.map((item, index) => (
                      <TransactionSend
                                key={item.id} 
                                res = {item}
                                />
                    )) : (
                      currentSendComponent !== 4 ? (
                        ""
                      ) : (
                        <div className={style.empty}>No existen solicitudes de envio.</div>
                      )
                    )}
                    {currentSendComponent === 5 && donaciones.length > 0 ? 
                    donaciones.map((item, index) => (
                      <TransactionDonations
                                key={item.id} 
                                res = {item}
                                />
                    )) : (
                      currentSendComponent !== 5 ? (
                        ""
                      ) : (
                        <div className={style.empty}>No hay solicitudes de recibos pendientes.</div>
                      )
                    )}
                    
                  </div>


                </div>
                  }


               
              </div>
            </div>

           {/* <div className="header" >
              <div className="line"></div>
              <h3>Envios</h3> 
            </div>
            <div className={style.options} >
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

            </div>*/}
            

          </div>
        </div> 
    )
  }
  