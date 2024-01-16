"use client"
import Receive from "./Receive";
import axios from "axios"
import { useEffect, useState } from "react";
import style from "../../../public/assets/styles/Link.module.css"
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation';
import Details from "./Details";
import Dialog from "../Dialog";

export default function Link(){
    const [res, SetRes] = useState([])
    const [resDelete, SetResDelete] = useState([])
    const [copyLink, setCopyLink] = useState("");
    const [visible, SetVisible] = useState(false)
    const [receiveIdToDelete, setReceiveIdToDelete] = useState(null);

    const [selected, setSelected] = useState(0)
    const [dialog, setDialog] = useState(false)
    const [loading, setLoading] = useState(false)
    let codesFromLocalStorage = [];
    if (typeof window !== 'undefined') {
     codesFromLocalStorage = JSON.parse(localStorage.getItem('codigoPago')) || [];
    }
    const [code, SetCode] = useState(codesFromLocalStorage);


    console.log("CODE", code)


    useEffect(() => {
        const recibos = async () =>{
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
                 console.log(response);

                 
                 SetCode(JSON.parse(localStorage.getItem('codigoPago')))
                    
                    let codigos = JSON.parse(localStorage.getItem('codigoPago')) || [];

                    console.log("1234", codigos )

                    // Filtrar los códigos que no existen en la respuesta de la petición
                    /*codigos = codigos.filter(codigo => res.some(resCodigo => resCodigo.id === codigo.id));*/

                    /*// Almacenar el arreglo filtrado en el localStorage
                    localStorage.setItem('codigoPago', JSON.stringify(codigos));

                    // Actualizar el estado code con el nuevo arreglo
                    SetCode(codigos);*/
                    console.log("Codigo",codigos)
                    console.log("Code", code)
                    
                
               } catch(error) {
                console.log(error.response);
               }    
             }
      recibos() 
      }, []);

      //  Cambia el numero counter para saber que codigo se selcciono
      const createLink = (index) => {
        setSelected(index);
     };

     //Para eliminar el codigo
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
            let codigos = JSON.parse(localStorage.getItem('codigoPago')) || [];
            codigos = codigos.filter(codigo => codigo.id !== id);
            localStorage.setItem('codigoPago', JSON.stringify(codigos));
            SetCode(codigos);
            
           } catch(error) {
            console.log(error.response);
            setLoading(false)
           }    
         }



         
 
    return(
        <div className={style.cont} >
            {visible && <Details 
            SetVisible = {SetVisible}
            recibir = {res[selected]}
            /> }
            {dialog && <Dialog header = "Borrar Codigo de Pago"
                                content = "Estas seguro que quieres borrar este Codigo de Pago?"
                                SetActive = {setDialog}
                                active = {dialog}
                                fnc = {() => DeleteRecieves(receiveIdToDelete)}
                                setLoading = {setLoading}
                                loading = {loading}/>}
            <div className={style.content}>
                <div className={style.header}>
                 <div className={style.line}></div>
                 <h3>Codigos de Pago</h3> 
                </div>
               
               {code.map((item, index)=>{
                   const uniqueKey = uuidv4(); // Generar un UUID para cada elemento
                   return <Receive  res = {item} 
                                    key = {uniqueKey} 
                                    SetVisible = {SetVisible} 
                                    setCounter = {item.id} 
                                    setSelected = {createLink.bind(this, index)}
                                    setDialog = {() => {
                                        setReceiveIdToDelete(item.id);
                                        setDialog(true);
                                      }}/>
                     })}
                
 
            </div>
           
 
        </div>
        
    )
 }