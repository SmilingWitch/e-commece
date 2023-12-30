'use client'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation'
import style from "../../public/assets/styles/Login.module.css"
import axios from "axios"
import BeatLoader from "react-spinners/BeatLoader"
import { FaRegCheckCircle } from "react-icons/fa";


export default function EmailVerify(){
    const searchParams = useSearchParams()
    const token = searchParams.get('token')
    const router = useRouter()
    const [incorrect,setIncorrect]= useState("")
    const [loading,setLoading]= useState(true)

    console.log(token)

    useEffect(() => {
      if(token){
        const accountVerify = async () => {
        try{
          await axios.get(`https://zona0.onrender.com/accounts/email/verify/${token}/`)
          setIncorrect(false)
          
          setTimeout(() => {
            setLoading(false)
            router.push('/accounts/login'); 
          }, 5000); 
        }catch(error){
          setIncorrect(true)
          setLoading(false)
          /*setTimeout(() => {
            router.push('/'); 
          }, 5000); */
        }}
        accountVerify()
      }
    
      // return () => clearTimeout(timer); // Limpia el temporizador si el componente se desmonta antes de que se ejecute el temporizador
     }, [router]);


 return (
 <div className={style.formBx}>
    <form className={style.form1}>
    <div className={style.logo}>
                    <img src="/assets/images/[removal.ai]_597ed435-d169-410c-962e-7dbf022aae9f-photo1702144866.png" alt="" />
                    <span>rca Store</span>
                </div>
                {!loading ? <div className = {style.header1}>
                  {incorrect == false ?
                  <div className={style.correctBx}>
                    <span><FaRegCheckCircle/></span>
                    <span>Su cuenta ha sido verificada!!</span>
                  </div>
                    :
                    <div className={style.correctBx}>
                      <span><div className={style.circle}>X</div></span>
                      <span>El enlace de verificacion vencio.</span>
                    </div>
                    
                    
                    }
                  </div>:
              <div className={style.spinner}>
              <div className="sweet-loading">
                  <BeatLoader
                    color="rgba(255, 68, 0,1)"
                    cssOverride={{}}
                    margin={20}
                    size={15}
                    speedMultiplier={1}
                  />
              </div>
          </div>}

            </form>
 

 </div>
 );
}