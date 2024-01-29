"use client"
import style from "../../../public/assets/styles/Donar.module.css"
import axios from "axios"
import { useState, useEffect } from "react"
import InstitutionCard from "./InstitutionsCard"

export default function Donar(){
    const [institution, SetInstitution] = useState([])

    useEffect(() => { 
        institutions() 
  
        /*AOS.init({
          duration:2000
        });*/
      }, []);

    const institutions = async () =>{
        const token = sessionStorage.getItem('access')
        console.log(token)
        console.log("Peticion")
        
        try {
            const response = await axios.get('https://zona0.onrender.com/institutions/list-institution/', { 
               headers: {
                   'Authorization': 'Bearer ' + token
               }
             });
             SetInstitution(response.data)
             console.log("institutions",response.data)
             
             /*SetCodeEnvios(JSON.parse(sessionStorage.getItem('send')))
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
            console.log("CODE ENVIOS",codigossessionStorage)*/
            
               
                
            
           } catch(error) {
            console.log(error.response);
           }    
         }





    return(
        <div className={style.cont}  data-aos="fade-up">
            <div className={style.content} >
                <div className={style.header}/* data-aos="fade-up"*/>
                  <div className={style.line}></div>
                  <h3>Donar</h3>
                </div>
                <div className={style.institutionBx}>
                    {institution.map((item/*, index*/) => (
                    <InstitutionCard res = {item}/>
                    ))}

                </div>
            </div>
        </div>
        
    )
}