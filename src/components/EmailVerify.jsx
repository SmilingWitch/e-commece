'use client'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation'
import style from "../../public/assets/styles/Login.module.css"
import Link from "next/link"
import axios from "axios"


export default function EmailVerify(){
    const searchParams = useSearchParams()
    const token = searchParams.get('token')
    const [redirect,setRedirect] = useState(false)
    const [correct,setCorrect] = useState(false)
    const router = useRouter()
   
    const handleSubmit = async (e) => {
        e.preventDefault();
      try{
        console.log(formValue)
        const res = await axios.get(`https://zona0.onrender.com//accounts/email/verify/${token}/`)
        console.log("response",res.data)
        setError('')
        setCorrect(true)
        router.push("/login")
        console.log(correct)
      }catch(error){
        console.log(error)
        /*setError(error.response.data)*/
      }
    }


 return (
 <div className={style.formBx}>
    <form className={style.form1}>
                <div className={style.logo}>
                    <span>Verifica tu correo</span>
                </div>
                <input type="submit" value="Verificar" className={style.submit} onClick={(e) => handleSubmit(e)} />
                <div className={style.correct}>
                    <span><Link href = "/login">Volver al login</Link></span>
                </div>

            </form>
 

 </div>
 );
}