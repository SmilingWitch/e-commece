import style1 from "../../public/assets/styles/Cart.module.css"
import style from "../../public/assets/styles/ChangePassword.module.css"
import style2 from "../../public/assets/styles/Login.module.css"
import { IoIosArrowBack } from "react-icons/io";
import {useState, useEffect} from "react"
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import axios from "axios"
import { FaRegCheckCircle } from "react-icons/fa";
import BeatLoader from "react-spinners/BeatLoader"
import AOS from 'aos';
import 'aos/dist/aos.css';


export default function ChangePassword({SetActivechangePass, closeAll}){


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



    const [formValue,setFormValue]=useState({
        new_password1:'',
        new_password2:''
      });

    const [redirect,setRedirect] = useState(false)
    const [error,setError] = useState('')
    const [response,setResponse] = useState('')
    const [loading,setLoading] = useState(false)
    

    const handleChange= (event) => {
      setFormValue({
        ...formValue,
        [event.target.name]:event.target.value
      })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = sessionStorage.getItem('access')
        setLoading(true)
      try{
        console.log(formValue)
        const res = await axios.post('https://zona0.onrender.com/accounts/password/change/',formValue,{
            headers: {
              'Authorization': `Bearer ${token}`
            }
           })
        console.log("response",res.data)
        setError('')
        setResponse(res.data.detail)
        setLoading(false)
      }catch(error){
        console.log(error.response.data)
        if (error.response) {
          setLoading(false)
            // El servidor respondió con un estado fuera del rango de 2xx
            setError(error.response.data);
            console.log(error)
          } else if (error.request) {
            alert("Something went wrong. Try in a few minutes!!")
          } else {
            alert("Something went wrong. Try in a few minutes!!")
            console.log(error)
          }
          if (error.response.status === 500) {
            alert("Something went wrong. Try in a few minutes!!")
          }
          console.log(error)
      }
    }

    useEffect(() => { 
      AOS.init({
        duration:200
      });
    }, []);

    return(
        <div className={style.cont} data-aos="fade-left" onClick = {() =>{
                                                    setResponse("");
                                                    closeAll}}>
            <div className={style.bx} onClick = {(event) => {event.stopPropagation()}}>
                <div className={style1.header}>
                
                    <div className={style.header1}>
                        <h2 className = {style1.iconH2} onClick = {() =>{
                            setResponse("");
                            SetActivechangePass(false)} } ><IoIosArrowBack/></h2>
                        <h2>Cambiar Contrasena</h2>
                    </div>
                </div>

                <div className={style.form}>
                    <form>
                        <div  className= {error.new_password1 ? `${style2.errorHeader} ${style2.label}` : `${style2.label}`}>Nueva Contrasena</div>
                        <div className={style2.input}>
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

                        <div className= {error.new_password2 ? `${style2.errorHeader} ${style2.label}` : `${style2.label}`}>Repetir Contrasena</div>    
                        <div className={style2.input}>
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
                            value="Cambiar contrasena" 
                            onClick={(e) => handleSubmit(e)}
                            className={style.submit} />}

                    </form>
                   { response !== "" ?
                    <div className={style.resp}>
                        <span><FaRegCheckCircle/></span>
                        <span>{response}</span>
                    </div>:""

                   } 
                
                </div>
   
                    </div>

                </div>
    )
}