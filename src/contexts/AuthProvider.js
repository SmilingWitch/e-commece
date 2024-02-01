// src/contexts/AuthProvider.js
"use client"
import React, { useState } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation'


export function AuthProvider({ children }) {
  let userFromsessionStorage = null;
  let credentialFromsessionStorage = null;
  let institutionsFromlocalStorage = [];
  if (typeof window !== 'undefined') {
    userFromsessionStorage = sessionStorage.getItem('access') || null;
    credentialFromsessionStorage = JSON.parse(sessionStorage.getItem('credential')) || null;
    institutionsFromlocalStorage= JSON.parse(localStorage.getItem('institutions')) || [];
  }

  
  const [user, setUser] = useState(null);
  const [credential, setCredential] = useState(credentialFromsessionStorage);
  
  /*const [credential, setCredential] = useState(null);*/
  const updateCredential = (newCredential) => {
    // Actualiza el estado de credential
    setCredential(newCredential);
   
    // Actualiza el credential en sessionStorage
    sessionStorage.setItem('credential', JSON.stringify(newCredential));
   };
   
   
  
 
 const router = useRouter()



/*--------------------INSTITUTIONS-------------------- */

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
      console.log("CODE ENVIOS",codigoslocalStorage)


     } catch(error) {
      console.log(error.response);

     }    
   }

 /*--------------------SING IN-------------------- */
 const signIn = async (formValue) => {
  console.log("FormValue",formValue)
  console.log("Autenticacion")
 try {
   const response = await axios.post('https://zona0.onrender.com/accounts/login/',  formValue );
   console.log("Autenticacion1")
   sessionStorage.setItem('access', response.data.access);
   sessionStorage.setItem('refresh', response.data.refresh);
   sessionStorage.setItem('credential', JSON.stringify(response.data.user)); // Guarda toda la respuesta del usuario

    console.log("CREDENTIAL",response.data.user)
    setUser(sessionStorage.getItem('access')); // Recupera toda la respuesta del usuario
    setCredential(JSON.parse(sessionStorage.getItem('credential')));
    console.log(credential)
   console.log(response)
   console.log("FormValue",formValue)
  router.push('/dashboard/wallet')
 } catch (error) {
   console.log(error.response)
   console.log("No se hizo la peticion")
   
 }
 };


 /*--------------------SING OUT--------------------*/
 const signOut = async () => {
  const token = sessionStorage.getItem('refresh')
  try {
    const response = await axios.post('https://zona0.onrender.com/accounts/logout/', {refresh : token} )
    console.log("logout")
    console.log(response)
    sessionStorage.removeItem('access');
    sessionStorage.removeItem('refresh');
    sessionStorage.removeItem('credential');
    setCredential(null)
    setUser(null);
    sessionStorage.removeItem('pay');
    sessionStorage.removeItem('points');
    sessionStorage.removeItem('payCodeEfect');
    sessionStorage.removeItem('send');
    router.push('/accounts/login')
  } catch (error) {
    console.log(error.response)
    console.log("No se hizo la peticion")
    
  }
 };

 /*--------------------VERIFY TOKEN--------------------*/
 const verifyToken = async () => {
  try {
    const accessToken =  sessionStorage.getItem('access');
    const response = await axios.post('https://zona0.onrender.com/accounts/accounts/token/verify/', { token: accessToken });
    if (!response.data.valid) {
      signOut();
    }
  } catch (error) {
    console.error(error);
  }
};


/*--------------------OBTEIN PAY CODES--------------------*/

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
       
      console.log(response);
      sessionStorage.setItem('codes', response.data);
     } catch(error) {
      console.log(error.response);
     }    
   }
   


/*useEffect(() => {
  const intervalId = setInterval(verifyToken, 840000);
  return () => clearInterval(intervalId);
}, []);*/

useEffect(() => {
  if (credential === null) {
    router.push('/accounts/login');
 }
  if (typeof window !== 'undefined') {
    let storedCredential = null;
      try {
       storedCredential = JSON.parse(sessionStorage.getItem('credential')) || null;
      } catch (error) {
       console.error('Error al analizar los datos de sessionStorage:', error);
      }

    const storedUser = sessionStorage.getItem('access') || null
    setUser(storedUser);
    setCredential(storedCredential);
  }
  /*recibos()*/
  institutions() 
}, []);



useEffect(() => {
  if (credential === null) {
     router.push('/accounts/login');
  }
 }, [user]);

 return (
 <AuthContext.Provider value={{ user, signIn, signOut, credential, updateCredential }}>
 {children}
 </AuthContext.Provider>
 );
}
