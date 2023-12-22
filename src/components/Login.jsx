"use client"

import style from "../../public/assets/styles/Login.module.css"
import { FiUser } from "react-icons/fi";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdOutlineMail } from "react-icons/md";
import Link from "next/link"
import {useState, useEffect} from "react"
import axios from "axios"
import { useRouter } from 'next/navigation'


export default function Login(){
    const router = useRouter()

    const [formValue,setFormValue]=useState({
        username:'',
        password:'',
        email: ''
      });

    const [redirect,setRedirect] = useState(false)
    const [error,setError] = useState('')

    const handleChange= (event) => {
      setFormValue({
        ...formValue,
        [event.target.name]:event.target.value
      })
    }

    const handleSubmit = async (e) => {
        console.log("AUTENTICACION")
        e.preventDefault();
      try{
        console.log("AUTENTICACION1")
        console.log(formValue)
        const res = await axios.post('https://zona0.onrender.com/accounts/login/',formValue)
        console.log("response",res.data)
        localStorage.setItem('access',res.data.data.access)
        localStorage.setItem('refresh',res.data.data.refresh)
        setError('')
        setRedirect(true)
        console.log(redirect)
      }catch(error){
        console.log(error.response)
        setError('Unable to log in with provided credentials.')
      }
    }


    if (redirect === true) {
        router.push('/home');
      }
    
    
    return (
        <div className={style.bx}>
            <div className={style.formBx}>
                
                <form className={style.form}>

                <div className={style.logo}>
                    <img src="/assets/images/[removal.ai]_597ed435-d169-410c-962e-7dbf022aae9f-photo1702144866.png" alt="" />
                    <span>rca Store</span>
                </div>
                    {error === '' ? "" : <div className={style.error}>{error}</div>}
                    
                    <div className={style.label}>Email</div>
                    <div className={style.input}>
                        <input 
                        type="email" 
                        placeholder="Email"
                        name = "email"
                        value={formValue.email}
                        onChange={handleChange} />
                        <span><MdOutlineMail/></span>
                      </div>

                    <div className={style.label}>Contrasena</div>
                    <div className={style.input}>
                        <input 
                        type="password" 
                        placeholder="Contrasena"
                        name = "password"
                        value={formValue.password}
                        onChange={handleChange} />
                        <span><RiLockPasswordLine/></span>
                    </div>
                    <input
                    type="submit" 
                    value="Autenticar" 
                    onClick={(e) => handleSubmit(e)}
                    className={style.submit} />
                    <div className={style.resend}>
                        <Link href="/accounts/password-reset">Has olvidado tu contrasena?</Link>
                    </div>
                    <div className={style.redirect}>
                        No tienes cuenta? 
                        <span><Link href = "/accounts/registro">Registrarse</Link></span>
                    </div>
                </form>
                 
            </div>
            
        </div>
    )
  }