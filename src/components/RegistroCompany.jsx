"use client"

import style from "../../public/assets/styles/Login.module.css"
import Link from "next/link"
import {useState, useEffect} from "react"
import axios from "axios"
import { useRouter } from 'next/navigation'




export default function RegistroCompany(){

    const router = useRouter()

    const [formValue,setFormValue]=useState({
        company_name: '',
        name: '',
        last_name: '',
        
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
      try{
        console.log("AUTENTICACION1")
        console.log(formValue)
        const res = await axios.post('https://zona0.onrender.com/register/company/',formValue)
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







    return(
        <div className={style.bx}>
        <div className={style.formBx}>
            
            <form className={style.form1}>
                <div className={style.logo}>
                    <img src="/assets/images/[removal.ai]_597ed435-d169-410c-962e-7dbf022aae9f-photo1702144866.png" alt="" />
                    <span>rca Store</span>
                </div>
                <div className={style.label}>Nombre de la compania</div>
                <div className={style.input}>
                    <input 
                    type="text" 
                    name="company_name" 
                    id="" 
                    required
                    value={formValue.company_name}
                    onChange={handleChange}
                    placeholder="Nombre" />
                </div>

                <div className={style.label}>Nombre del dueno</div>
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
                    type="text" 
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

                <div className={style.label}>Tipo de compania</div>
                <div className={style.input}>
                    <input 
                    type="text" 
                    name="type" 
                    id="" 
                    required
                    value={formValue.type}
                    onChange={handleChange}
                    placeholder="Tipo" />
                </div>

                <div className={style.label}>Codigo de la compania</div>
                <div className={style.input}>
                    <input 
                    type="text" 
                    name="company_code" 
                    id="" 
                    required
                    value={formValue.company_code}
                    onChange={handleChange}
                    placeholder="Codigo" />
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
                
                <input type="submit" value="Registrar" className={style.submit} />
                <div className={style.redirect}>
                    Ya tienes cuenta? 
                    <span><Link href = "/login">Autenticarse</Link></span>
                </div>
            </form>
             
        </div>
        
    </div>
    )
    
}