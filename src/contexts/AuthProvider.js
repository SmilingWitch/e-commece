// src/contexts/AuthProvider.js
"use client"
import React, { useState } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation'


export function AuthProvider({ children }) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('credential')) || null);
  const [credential, setCredential] = useState(JSON.parse(localStorage.getItem('credential')) || null);
  
 
 const router = useRouter()

 /*--------------------SING IN-------------------- */
 const signIn = async (formValue) => {
  console.log("FormValue",formValue)
  console.log("Autenticacion")
 try {
   const response = await axios.post('https://zona0.onrender.com/accounts/login/',  formValue );
   console.log("Autenticacion1")
  /* localStorage.setItem('access', response.data.access);
   localStorage.setItem('refresh', response.data.refresh);
   localStorage.setItem('credential', response.data.user);
   console.log("MMMM",response.data.user)
   setUser( localStorage.getItem('access'));
   setCredential(response.data.user)
   console.log("CREDenciales",credential)*/
    localStorage.setItem('access', response.data.access);
    localStorage.setItem('refresh', response.data.refresh);
    localStorage.setItem('credential', JSON.stringify(response.data.user)); // Guarda toda la respuesta del usuario
    setUser(localStorage.getItem('access')); // Recupera toda la respuesta del usuario
    setCredential(JSON.parse(localStorage.getItem('credential')));
   console.log(response)
   console.log("FormValue",formValue)
  router.push('/catalogo')
 } catch (error) {
   console.log(error.response)
   console.log("No se hizo la peticion")
   
 }
 };


 /*--------------------SING OUT--------------------*/
 const signOut = async () => {
  const token = localStorage.getItem('refresh')
  try {
    const response = await axios.post('https://zona0.onrender.com/accounts/logout/', {refresh : token} )
    console.log("logout")
    console.log(response)
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    localStorage.removeItem('credential');
    setCredential(null)
    setUser(null);
  } catch (error) {
    console.log(error.response)
    console.log("No se hizo la peticion")
    
  }
 };

 /*--------------------VERIFY TOKEN--------------------*/
 const verifyToken = async () => {
  try {
    const accessToken = localStorage.getItem('access');
    const response = await axios.post('https://zona0.onrender.com/accounts/accounts/token/verify/', { token: accessToken });
    if (!response.data.valid) {
      signOut();
    }
  } catch (error) {
    console.error(error);
  }
};

useEffect(() => {
  const intervalId = setInterval(verifyToken, 840000);
  return () => clearInterval(intervalId);
}, []);

 return (
 <AuthContext.Provider value={{ user, signIn, signOut, credential }}>
 {children}
 </AuthContext.Provider>
 );
}
