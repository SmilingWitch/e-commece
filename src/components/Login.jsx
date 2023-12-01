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
        email:''
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
      try{
        console.log("AUTENTICACION1")
        const res = await axios.post('https://zona0.onrender.com/accounts/login/',formValue)
        console.log("response",res)
        localStorage.setItem('access',res.data.data.access)
        localStorage.setItem('refresh',res.data.data.refresh)
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
            <div className={style.wave}>
                <img src="/assets/images/wave.svg" alt="" />
            </div>
            <div className={style.formBx}>
                
                <form className={style.form}>

                    <div className={style.logo}>
                        Zona 0
                    </div>
                    <div className={style.input}>
                        <input 
                        type="text" 
                        placeholder="Username" 
                        required
                        name = "username"
                        value={formValue.username}
                        onChange={handleChange}/>
                        <span><FiUser/></span>
                    </div>
                    <div className={style.input}>
                        <input 
                        type="email" 
                        placeholder="Email"
                        required
                        name = "email"
                        value={formValue.email}
                        onChange={handleChange} />
                        <span><MdOutlineMail/></span>
                    </div>
                    <div className={style.input}>
                        <input 
                        type="password" 
                        placeholder="Password"
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
                        <Link href="/">Has olvidado tu contrasena?</Link>
                    </div>
                    <div className={style.redirect}>
                        No tienes cuenta? 
                        <span><Link href = "/registro">Registrarse</Link></span>
                    </div>
                </form>
                 
            </div>
            
        </div>
    )
  }