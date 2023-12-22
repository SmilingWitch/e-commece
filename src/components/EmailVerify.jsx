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
                    <img src="/assets/images/[removal.ai]_597ed435-d169-410c-962e-7dbf022aae9f-photo1702144866.png" alt="" />
                    <span>rca Store</span>
                </div>
                <div className={style.header_reset}>
                    <span>Verifica tu correo</span>
                </div>
                <input type="submit" value="Reenviar correo" className={style.submit} onClick={(e) => handleSubmit(e)} />
                <div className={style.correct}>
                    <span><Link href = "/accounts/login">Volver al login</Link></span>
                </div>

            </form>
 

 </div>
 );
}