"use client"

import style from "../../public/assets/styles/Login.module.css"
import { FiUser } from "react-icons/fi";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdOutlineMail } from "react-icons/md";
import Link from "next/link"
import {useState, useEffect} from "react"
import axios from "axios"
import { useRouter } from 'next/navigation'
import BeatLoader from "react-spinners/BeatLoader"

export default function ForgotPassword(){


    const router = useRouter()

    const [formValue,setFormValue]=useState({
        email: ''
      });

    const [correct,setCorrect] = useState(false)
    const [error,setError] = useState('')
    const [loading,setLoading] = useState(false)

    const handleChange= (event) => {
      setFormValue({
        ...formValue,
        [event.target.name]:event.target.value
      })
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
      try{
        const res = await axios.post('https://zona0.onrender.com/accounts/password/reset/',formValue)
        console.log("response",res.data)
        setError('')
        setCorrect(true)
        setLoading(false)
      }catch(error){
        console.log(error)
        setCorrect(false)
        console.log(error.response)
        setError(error.response)
        setLoading(false)
      }
    }


    return(
        <div className={style.bx}>
            {correct ? <div className={style.formBx}>
                
                <form className={style.form}>

                <div className={style.logo}>
                    <img src="/assets/images/[removal.ai]_597ed435-d169-410c-962e-7dbf022aae9f-photo1702144866.png" alt="" />
                    <span>rca Store</span>
                </div>
                <div className={style.header_reset}>
                    <span>Mira tu correo</span>
                    <span>Hemos enviado un link de cambio de contrasena al correo: <br/>
                        <div>{formValue.email}</div>
                    </span>
                </div>
                      
                    <div className={style.correct}>
                        <span><Link href = "/accounts/login">Volver al login</Link></span>
                    </div>
                </form>
                 
            </div>
            :<div className={style.formBx}>
                
            <form className={style.form}>

            <div className={style.logo}>
                <img src="/assets/images/[removal.ai]_597ed435-d169-410c-962e-7dbf022aae9f-photo1702144866.png" alt="" />
                <span>rca Store</span>
            </div>
            <div className={style.header_reset}>
                <span>Olvidaste tu contrasena??</span>
                <span>No te preocupes, te mandaremos un link para cambiar tu contrasena.</span>
            </div>
            
                {error === '' ? "" : <div className={style.error}>{error}</div>}
                
                <div className={style.label}>Email</div>
                <div className={style.input}>
                    <input 
                    type="email" 
                    placeholder="user@gmail.com"
                    name = "email"
                    value={formValue.email}
                    onChange={handleChange} />
                    <span><MdOutlineMail/></span>
                  </div>
                  
                  {loading ? 
                    <div className="sweet-loading">
                    <BeatLoader
                      color="rgba(255, 68, 0,1)"
                      cssOverride={{}}
                      margin={10}
                      size={10}
                      speedMultiplier={1}
                    />
                </div>
                :<input
                    type="submit" 
                    value="Resetear contrasena" 
                    onClick={(e) => handleSubmit(e)}
                    className={style.submit} />}
                <div className={style.correct}>
                    <span><Link href = "/accounts/login">Volver al login</Link></span>
                </div>
            </form>
             
        </div> }
            
        </div>
   
    );
}