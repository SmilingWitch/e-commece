"use client"

import style from "../../public/assets/styles/Login.module.css"
import { FiUser } from "react-icons/fi";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdOutlineMail } from "react-icons/md";
import Link from "next/link"
import {useState, useEffect} from "react"
import axios from "axios"
import { useRouter } from 'next/navigation'
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";



export default function PasswordReset(){
    const router = useRouter()

    const [formValue,setFormValue]=useState({
        new_password1:'',
        new_password2:'',
        uid: '',
        token: ''
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
        e.preventDefault();
      try{
        console.log(formValue)
        const res = await axios.post('https://zona0.onrender.com/accounts/password/reset/confirm/',formValue)
        console.log("response",res.data)
        setError('')
        router.push("/accounts/login")
      }catch(error){
        if (error.response) {
            // El servidor respondió con un estado fuera del rango de 2xx
            setError(error.response.data);
            console.log(error)
          } else if (error.request) {
            alert("Something went wrong. Try in a few minutes!!")
          } else {
            alert("Something went wrong. Try in a few minutes!!")
          }
          if (error.response.status === 500) {
            alert("Something went wrong. Try in a few minutes!!")
          }
      }
    }

    //Para poner visible/invisible la contrasena
    const [pass,setPass] = useState('password')
    const [pass2,setPass2] = useState('password')

    const viewPass = () => {
      if (pass === 'password'){
        setPass('text')
      }
      else setPass('password')
    }
  
    const viewPass2 = () => {
      if (pass2 === 'password'){
        setPass2('text')
      }
      else setPass2('password')
    }
    
    
    return (
        <div className={style.bx}>
            <div className={style.formBx}>
                
                <form className={style.form}>

                <div className={style.logo}>
                    <img src="/assets/images/[removal.ai]_597ed435-d169-410c-962e-7dbf022aae9f-photo1702144866.png" alt="" />
                    <span>rca Store</span>
                </div>
                   
                    
                    <div  className= {error.new_password1 ? `${style.errorHeader} ${style.label}` : `${style.label}`}>Nueva Contrasena</div>
                    <div className={style.input}>
                      <input
                          id="password-register"
                          type={pass}
                          name = "new_password1"
                          className="form-control"
                          required
                          placeholder="Contrasena"
                          value={formValue.new_password1}
                          onChange={handleChange}
                        />
                      <span onClick={viewPass}>
                      {pass === 'password' ? <IoEyeOutline/>:<IoEyeOffOutline/>}
                      </span>
                    </div>
                    {error.new_password1 === undefined ? "" : <div className={style.error}>{error.new_password1}</div>}


                    <div className= {error.new_password2 ? `${style.errorHeader} ${style.label}` : `${style.label}`}>Repetir Contrasena</div>
                    <div className={style.input}>
                      <input
                          id="password-register"
                          type={pass2}
                          name = "new_password2"
                          className="form-control"
                          required
                          placeholder="Contrasena"
                          value={formValue.new_password2}
                          onChange={handleChange}
                        />
                      <span onClick={viewPass2}>
                      {pass2 === 'password' ? <IoEyeOutline/>:<IoEyeOffOutline/>}
                      </span>
                    </div>
                    {error.new_password2 === undefined ? "" : <div className={style.error}>{error.new_password2}</div>}

                    <div className= {error.token ? `${style.errorHeader} ${style.label}` : `${style.label}`}>Codigo</div>
                    <div className={style.input}>
                        <input 
                        type="text" 
                        placeholder="Codigo"
                        name = "token"
                        value={formValue.toquen}
                        onChange={handleChange} />
                        <span><RiLockPasswordLine/></span>
                    </div>
                    {error.token === undefined ? "" : <div className={style.error}>{error.token}</div>}

                    <div className= {error.uid ? `${style.errorHeader} ${style.label}` : `${style.label}`}>Id de solicitud</div>
                    <div className={style.input}>
                        <input 
                        type="text" 
                        placeholder="Id"
                        name = "uid"
                        value={formValue.uid}
                        onChange={handleChange} />
                        <span><RiLockPasswordLine/></span>
                    </div>
                    {error.uid === undefined ? "" : <div className={style.error}>{error.uid}</div>}

                    <input
                    type="submit" 
                    value="Mandar" 
                    onClick={(e) => handleSubmit(e)}
                    className={style.submit} />
                    <div className={style.correct}>
                        <span><Link href = "/accounts/login">Volver al login</Link></span>
                    </div>
                </form>
                 
            </div>
            
        </div>
    )
}