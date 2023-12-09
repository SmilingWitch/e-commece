"use client"

import style from "../../public/assets/styles/Login.module.css"
import Link from "next/link"
import {useState, useEffect} from "react"
import axios from "axios"
import { useRouter } from 'next/navigation'


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
        console.log("AUTENTICACION")
      try{
        console.log("AUTENTICACION1")
        console.log(formValue)
        const res = await axios.post('https://zona0.onrender.com/register/client/', data)
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




    return(
        <div className={style.bx}>
        <div className={style.formBx}>
            
            <form className={style.form1}>
                <div className={style.logo}>
                    <img src="/assets/images/[removal.ai]_597ed435-d169-410c-962e-7dbf022aae9f-photo1702144866.png" alt="" />
                    <span>rca Store</span>
                </div>
                <div className={style.label}>Nombre</div>
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

                <div className={style.label}>Apellidos</div>
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

                <div className={style.label}>Nombre de ususario</div>
                <div className={style.input}>
                    <input 
                    type="email" 
                    name="username" 
                    id="" 
                    required
                    value={formValue.username}
                    onChange={handleChange}
                    placeholder="Nombre de usuario" />
                </div>

                <div className={style.label}>Numero de carnet</div>
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

                <div className={style.label}>Telefono</div>
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

                <div className={style.label}>Email</div>
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

                <div className={style.label}>Contrasena</div>
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
                
                <input type="submit" value="Registrar" className={style.submit} onClick={(e) => handleSubmit(e)}/>
                <div className={style.redirect}>
                    Ya tienes cuenta? 
                    <span><Link href = "/login">Autenticarse</Link></span>
                </div>
            </form>
             
        </div>
        
    </div>
    )
    

    }