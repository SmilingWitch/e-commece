"use client"
import {useRouter} from "next/navigation"
import style from "../../../public/assets/styles/Recibir.module.css"
import { BsQrCodeScan } from "react-icons/bs";
import { useState, useEffect } from "react";
import Image from "next/image"
import AOS from 'aos';
import 'aos/dist/aos.css';
import QRCode from "react-qr-code";
import { IoMdCopy } from "react-icons/io";
import copyToClipboard from "../functions/copyToClipboard"
import axios from "axios"
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import Link from "next/link"
import { grey } from "@mui/material/colors";
import Details from "./Details";
import BeatLoader from "react-spinners/BeatLoader"

export default function Recibir(){
        const router = useRouter();
        const { user } = useContext(AuthContext);

        //variables
        let code = [];
        if (typeof window !== 'undefined') {
         code = JSON.parse(sessionStorage.getItem('pay')) || [];
        }

        //states
        const [link, SetLink] = useState(false)
        const [res, SetRes] = useState([])
        const [copyLink, setCopyLink] = useState("");
        const [visible, SetVisible] = useState(false)
        const [loading,setLoading] = useState(false)
        const [codigo, setCodigo] = useState(code);


        //functions

        const [formValue,setFormValue]=useState({
            amount:''
          });

        const handleChange= (event) => {
            setFormValue({
              ...formValue,
              [event.target.name]:event.target.value
            })
          }
        const createLink = async () =>{
                const token = sessionStorage.getItem('access')
                console.log(token)
                console.log("Peticion")
                setLoading(true)
                try {
                    const response = await axios.post('https://zona0.onrender.com/transfer/create-receive/', {amount: formValue.amount}, { 
                        headers: {
                            'Authorization': 'Bearer ' + token
                        }
                      });

                      // Guardar la nueva información del código en el estado
                        setCodigo(response.data);

                        // Recuperar los datos existentes del sessionStorage
                        let codigos = JSON.parse(sessionStorage.getItem('pay')) || [];

                        // Agregar el nuevo código al arreglo
                        codigos.push(response.data);

                        // Almacenar el arreglo actualizado en el sessionStorage
                        sessionStorage.setItem('pay', JSON.stringify(codigos));

                      console.log("CODIGO",sessionStorage.getItem('pay'))

                    SetRes(response.data)
                    console.log(response);
                    SetLink(true);
                    setCopyLink(res.code)
                    SetVisible(true)
                    setLoading(false)
                   } catch(error) {
                    console.log(error.response);
                    setLoading(false)
                   }
                   
          }

          useEffect(() => {
            AOS.init({
              duration:2000
          });
          }, []);

          /*if(link){
            router.push(`/dashboard/recibir/${res.code}`)
          }*/

                

    return(
 <div className={style.cont}>
          {visible && (<Details 
                          SetVisible = {SetVisible}
                          recibir = {res}
                          />) }
        <div className={style.content}>
            <div className={style.header} data-aos="fade-up">
              <div className={style.line}></div>
              <h3>Recibir OSP</h3> 
            </div>

            <div className={style.bx} data-aos="fade-up">

                <div className={style.description}>
                    <span>Entre el monto:</span>
                    <p>Introduzca la cantidad de SOP que desea recibir para generar un codigo de pago.</p>
                </div>

                <div className={style.input}>
                    <label >Monto a recibir:</label>
                    <div className={style.inputBx}>
                        <input  type="text" 
                                name="amount" id=""
                                value={formValue.amount}
                                onChange={handleChange} 
                                onKeyDown={(event) => {
                                    const keyCode = event.keyCode;
                                    const isNumber = (keyCode >= 48 && keyCode <= 57);
                                    const isBackspace = (keyCode === 8);
                                    if (!isNumber && !isBackspace) {
                                      event.preventDefault();
                                    }
                                  }}/>
                        <span>SOP</span>
                    </div>
                </div>
                {formValue.amount === "" ? <button className={style.deseableBtn}>Generar Link</button> :
                loading  ? <div className={style.loader}>
                   <BeatLoader
                color="rgba(255, 68, 0,1)"
                cssOverride={{}}
                margin={10}
                size={10}
                speedMultiplier={1}
              />
                </div> : <button onClick = {createLink}>Generar Codigo</button>}
            </div>
        </div>
    </div>
    )
}