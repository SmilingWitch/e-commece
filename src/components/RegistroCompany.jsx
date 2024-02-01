"use client"

import style from "../../public/assets/styles/Login.module.css"
import Link from "next/link"
import {useState, useEffect} from "react"
import axios from "axios"
import { useRouter } from 'next/navigation'
import { MdKeyboardArrowUp } from "react-icons/md";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { HiPlusCircle } from "react-icons/hi2";
import Image from "next/image"
import BeatLoader from "react-spinners/BeatLoader"
import { IoIosArrowDown } from "react-icons/io";
import {IoMdArrowBack} from "react-icons/io"

export default function RegistroCompany(){

    const router = useRouter()

    const [formValue,setFormValue]=useState({
        company_name: '',
        name: '',
        last_name: '',
        username:'',
        password:'',
        email: '',
        image: null, 
        type: ''
      });

    const [correct,setCorrect] = useState(false)
    const [error,setError] = useState('')
    const [loading,setLoading] = useState(false)
    const [visible,setVisible] = useState(false)
    const options = ["Mipyme", "TCP", "Estatal"]
    const defaultOption = "------"
    const [selectedOption, setSelectedOption] = useState(defaultOption);

    const handleChange= (event) => {
      setFormValue({
        ...formValue,
        [event.target.name]:event.target.value
      })
    }
    const handleClick = (option) => {
        setSelectedOption(option);
        setFormValue(prevState => ({
            ...prevState,
            type: option
        }));
    };
    
    

    const handleSubmit = async (e) => {
        console.log("AUTENTICACION")
        e.preventDefault();
        setLoading(true)
        console.log(formValue)
      try{
        console.log("AUTENTICACION1")
        console.log(formValue)
        const res = await axios.post('https://zona0.onrender.com/register/company/',formValue)
        console.log("response",res.data)
       
        setError('')
        setCorrect(true)
        setLoading(false)
        console.log(correct)
      }catch(error){
        setLoading(false)
        console.log(error)
        if (error.response) {
            // El servidor respondió con un estado fuera del rango de 2xx
            setError(error.response.data);
            console.log(error)
          }/* else if (error.request) {
            alert("Something went wrong. Try in a few minutes!!")
          } else {
            alert("Something went wrong. Try in a few minutes!!")
          }
          if (error.response.status === 500) {
            alert("Something went wrong. Try in a few minutes!!")
          }*/
      }
    }

    //Para seleccionar una imagen
    const [selectedFile, setSelectedFile] = useState(null);
    const [imageUrl, setImageUrl] = useState("/assets/images/imagenPorDefecto.png");
   
    const handleFileChange = (event) => {
     setSelectedFile(event.target.files[0]);
     setImageUrl(URL.createObjectURL(event.target.files[0]));
    }


    //Para poner visible/invisible la contrasena
    const [pass,setPass] = useState('password')

    const viewPass = () => {
      if (pass === 'password'){
        setPass('text')
      }
      else setPass('password')
    }

    //Para desplegar el menu


    return(
        <div className={style.bx}  >
        <div className={style.formBx}>
            { correct === true ? 
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
                            <div><IoMdArrowBack/></div>
                            Volver al login      
                        </Link>   
                    </span>
                </div>

            </form>
            
            : <form className={style.form1}> 
                <div className={style.logo}>
                    <img src="/assets/images/[removal.ai]_597ed435-d169-410c-962e-7dbf022aae9f-photo1702144866.png" alt="" />
                    <span>rca Store</span>
                </div>
                <div className= {error.company_name ? `${style.errorHeader} ${style.label}` : `${style.label}`}>Nombre de la compania</div>
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
                {error.company_name === undefined ? "" : <div className={style.error}>{error.company_name}</div>}

                <div className= {error.name ? `${style.errorHeader} ${style.label}` : `${style.label}`}>Nombre del dueno</div>
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

                <div className= {error.type ? `${style.errorHeader} ${style.label}` : `${style.label}`}>Tipo de compania</div>
                <div className={`${style.input} ${style.selectBx} `} onClick = {()=> setVisible(!visible)}>
                    <div>{selectedOption}</div>
                    <div className={style.selectIcon} onClick = {()=> setVisible(!visible)}><IoIosArrowDown/></div>
                    </div>
                    {visible && <div className={style.select1}>
                      {options.map((option, index) => (
                        <div key={index} onClick={() =>{ handleClick(option); setVisible(false)}} className={style.option}>
                          {option}
                        </div>
                      ))}
                    
                </div>}
                
                {error.type === undefined ? "" : <div className={style.error}>{error.type}</div>}

                <div className= {error.company_code? `${style.errorHeader} ${style.label}` : `${style.label}`}>Codigo de la compania</div>
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
                {error.company_code === undefined ? "" : <div className={style.error}>{error.company_code}</div>}

                
                <div className= {error.movil? `${style.errorHeader} ${style.label}` : `${style.label}`}>Telefono</div>
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
                    id="password-register"
                    type={pass}
                    name="password"
                    className="form-control"
                    required
                    placeholder="Contrasena"
                    value={formValue.password}
                    onChange={handleChange}
                  />
                <span onClick={viewPass}>
                {pass === 'password' ? <IoEyeOutline/>:<IoEyeOffOutline/>}
                </span>
            </div>
                {error.password === undefined ? "" : <div className={style.error}>{error.password}</div>}
                
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
                :<input type="submit" value="Registrar" className={style.submit} onClick={(e) => handleSubmit(e)} />}
                <div className={style.correct}>
                    Ya tienes cuenta? 
                    <span><Link href = "/accounts/login">Autenticarse</Link></span>
                </div>
            </form> }
            
             
        </div>
        
    </div>
    )
    
}