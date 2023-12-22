"use client"

import style from "../../public/assets/styles/Login.module.css"
import Link from "next/link"
import {useState, useEffect} from "react"
import axios from "axios"
import { useRouter } from 'next/navigation'
import {IoMdArrowBack} from "react-icons/io"


export default function Registro(){

    const router = useRouter()

    const [formValue,setFormValue]=useState({
        username:'',
        password:'',
        email: '',
        ci: '',
        name:'',
        last_name: '',
        movil: ''
      });

    const [redirect,setRedirect] = useState(false)
    const [error,setError] = useState('')
    const [correct,setCorrect] = useState(false)

    const data = {
        username: formValue.username,
        password: formValue.password,
        email: formValue.email,
        ci: formValue.ci,
        name: formValue.name,
        last_name: formValue.last_name,
        movil: formValue.movil
       };


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
        const res = await axios.post('https://zona0.onrender.com/register/client/', data)
        console.log("response",res.data)
        setError('')
        router.push("/accounts/login")
        setCorrect(true)
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


    return(
        <div className={style.bx}>
        <div className={style.formBx}>
            {correct === true ? 
            
            <form className={style.form1}>
            <div className={style.logo}>
                <img src="/assets/images/[removal.ai]_597ed435-d169-410c-962e-7dbf022aae9f-photo1702144866.png" alt="" />
                <span>rca Store</span>
            </div>
            <div className={style.header_verify}>
                <span>Revisa tu email</span>
                <div>
                    Hemos mandado un email a la cuenta
                    <div className={style.emailBold}>{formValue.email}</div>
                </div>
            </div>
                        
            <input type="submit" value="Reenviar correo" className={style.submit} onClick={(e) => handleSubmit(e)} />
            <div className={style.correct}>
                <span>
                    <Link href = "/accounts/login" className={style.log}>
                        <div><IoMdArrowBack/> </div>
                        Volver al login      
                    </Link>   
                </span>
            </div>
                        
            </form> :

            <form className={style.form1}>
            <div className={style.logo}>
                <img src="/assets/images/[removal.ai]_597ed435-d169-410c-962e-7dbf022aae9f-photo1702144866.png" alt="" />
                <span>rca Store</span>
            </div>
            <div className= {error.name ? `${style.errorHeader} ${style.label}` : `${style.label}`}>Nombre</div>
            <div className={style.input}>
                <input 
                type="text" 
                name="name" 
                id="" 
                required
                value={formValue.name}
                onChange={handleChange}
                placeholder="Nombre" />
            </div>
            {error.name === undefined ? "" : <div className={style.error}>{error.name}</div>}
                        
            <div className= {error.last_name ? `${style.errorHeader} ${style.label}` : `${style.label}`}>Apellidos</div>
            <div className={style.input}>
                <input 
                type="text" 
                name="last_name" 
                id="" 
                required
                value={formValue.last_name}
                onChange={handleChange}
                placeholder="Apellidos" />
            </div>
            {error.last_name === undefined ? "" : <div className={style.error}>{error.last_name}</div>}
                        
            <div className= {error.username ? `${style.errorHeader} ${style.label}` : `${style.label}`}>Nombre de ususario</div>
            <div className={style.input}>
                <input 
                type="text" 
                name="username" 
                id="" 
                required
                value={formValue.username}
                onChange={handleChange}
                placeholder="Nombre de usuario" />
            </div>
            {error.username === undefined ? "" : <div className={style.error}>{error.username}</div>}
                        
            <div className= {error.ci ? `${style.errorHeader} ${style.label}` : `${style.label}`}>Numero de carnet</div>
            <div className={style.input}>
                <input 
                type="text" 
                name="ci" 
                id="" 
                required
                value={formValue.ci}
                onChange={handleChange}
                placeholder="Numero de carnet" />
            </div>
            {error.ci === undefined ? "" : <div className={style.error}>{error.ci}</div>}
                        
            <div className= {error.movil ? `${style.errorHeader} ${style.label}` : `${style.label}`}>Telefono</div>
            <div className={style.input}>
                <input 
                type="tel" 
                name="movil" 
                id="" 
                required
                value={formValue.movil}
                onChange={handleChange}
                placeholder="Telefono" />
            </div>
            {error.movil === undefined ? "" : <div className={style.error}>{error.movil}</div>}
                        
            <div className= {error.email ? `${style.errorHeader} ${style.label}` : `${style.label}`}>Email</div>
            <div className={style.input}>
                <input 
                type="email" 
                name="email" 
                id="" 
                required
                value={formValue.email}
                onChange={handleChange}
                placeholder="Email" />
            </div>
            {error.email === undefined ? "" : <div className={style.error}>{error.email}</div>}
                        
            <div className= {error.password ? `${style.errorHeader} ${style.label}` : `${style.label}`}>Contrasena</div>
            <div className={style.input}>
                <input 
                type="password" 
                name="password" 
                id="" 
                required
                value={formValue.password}
                onChange={handleChange}
                placeholder="Password" />
            </div>
            {error.password === undefined ? "" : <div className={style.error}>{error.password}</div>}
                        
            <input type="submit" value="Registrarse" className={style.submit} onClick={(e) => handleSubmit(e)}/>
            <div className={style.redirect}>
                Ya tienes cuenta? 
                <span><Link href = "/accounts/login">Autenticarse</Link></span>
            </div>
            </form>
            
                        
                    }
                        
                         
                    </div>
                    
    </div>
    )
    

    }