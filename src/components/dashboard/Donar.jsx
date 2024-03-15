"use client"
import style from "../../../public/assets/styles/Donar.module.css"
import axios from "axios"
import { useState, useEffect } from "react"
import InstitutionCard from "./InstitutionsCard"
import BeatLoader from "react-spinners/BeatLoader"
import Image from "next/image"
import { useRouter } from 'next/navigation'
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

export default function Donar(){

        
    let institutionsFromlocalStorage = [];
    if (typeof window !== 'undefined') {
        institutionsFromlocalStorage= JSON.parse(localStorage.getItem('institutions')) || [];
    }
    



    const [institution, SetInstitution] = useState(institutionsFromlocalStorage)
    const [noInstitution, SetNoInstitution] = useState('')
    const [isMounted, setIsMounted] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter()
    const { credential } = useContext(AuthContext);

    useEffect(() => {
        if(institutionsFromlocalStorage.length === 0){
            setLoading(true)
        } else {
            setLoading(false)
        }
    }, [institutionsFromlocalStorage]);

    

    useEffect(() => { 
        institutions() 
        setIsMounted(true);
        /*AOS.init({
          duration:2000
        });*/
        if (credential === null) {
            router.push('/accounts/login');
         }
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
             setLoading(false)
             
             SetInstitution(JSON.parse(localStorage.getItem('institutions')))
             
                // Obtén los datos del almacenamiento local
            let codigoslocalStorage = JSON.parse(localStorage.getItem('institutions')) || [];
                        
            // Obtén los datos de la respuesta de la petición
            let codigosResponse = response.data;
                        
            // Para cada elemento en los datos de la respuesta de la petición
            codigosResponse.forEach(codigoResponse => {
               // Verifica si el elemento ya existe en el almacenamiento local
               let existeEnlocalStorage = codigoslocalStorage.some(codigolocalStorage => codigolocalStorage.id === codigoResponse.id);
            
               // Si el elemento no existe en el almacenamiento local, agrégalo
               if (!existeEnlocalStorage) {
                   codigoslocalStorage.push(codigoResponse);
               }
            });
            
            // Para cada elemento en el almacenamiento local
            codigoslocalStorage.forEach((codigolocalStorage, index) => {
               // Verifica si el elemento existe en los datos de la respuesta de la petición
               let existeEnResponse = codigosResponse.some(codigoResponse => codigoResponse.id === codigolocalStorage.id);
            
               // Si el elemento no existe en los datos de la respuesta de la petición, elimínalo del almacenamiento local
               if (!existeEnResponse) {
                   codigoslocalStorage.splice(index, 1);
               }
            });
            
            // Guarda los datos actualizados en el almacenamiento local
            localStorage.setItem('institutions', JSON.stringify(codigoslocalStorage));
            SetInstitution(codigoslocalStorage);
            console.log("CODE ENVIOS",codigoslocalStorage)

            console.log("institution",institution)
  
           } catch(error) {
            console.log(error.response);
            setLoading(false)

            if(error.response.status === 404){
                SetNoInstitution(404)   
            }
           }    
         }


         if (!isMounted) {
            return null; // Or some placeholder content
           }


    return(
        <div className="cont"  data-aos="fade-up">
            <div className="content" >
                <div className="header"/* data-aos="fade-up"*/>
                  <div className="line"></div>
                  <h3>Donar</h3>
                </div>
                {loading ? 
                <div className={style.loading}>

                    <Image 
                        width = {120}
                        height = {120}
                        src="/assets/images/[removal.ai]_597ed435-d169-410c-962e-7dbf022aae9f-photo1702144866.png" alt="" />
    
                    <div className={style.spinner}>
                        <div className="sweet-loading">
                            <BeatLoader
                              color="rgba(255, 68, 0,1)"
                              cssOverride={{}}
                              margin={15}
                              size={10}
                              speedMultiplier={1}
                            />
                        </div>
                    </div>

                </div> :
                noInstitution === 404 ? <div className={style.noInstitution}>No hay instituciones</div>:<div className={style.institutionBx}>
                    {institution && institution.map((item, index) => (
                    <InstitutionCard res = {item} key={item.id}  />
                    ))}

                </div>}
                
            </div>
        </div>
        
    )
}